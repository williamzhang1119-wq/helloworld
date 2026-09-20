import { buildSystemPrompt, type AgeBand } from "./prompts";
import { composeDemoReply } from "./demoTutor";
import { demoQuizJson } from "./quizBank";
import type { ChatTurn } from "./conversation";

export type { ChatTurn };

export function isDemoMode(): boolean {
  return !process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY;
}

export function resolveAnthropicModel(): string {
  return process.env.ANTHROPIC_MODEL?.trim() || "claude-sonnet-4-6";
}

export function resolveOpenAIModel(): string {
  return process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
}

export function demoReply(
  userText: string,
  attemptLevel = 1,
  ageBand: AgeBand = "explorer",
  history: ChatTurn[] = [],
): string {
  return composeDemoReply(userText, { attemptLevel, ageBand, history });
}

const DEFAULT_MAX_TOKENS = 1600;
const HISTORY_LIMIT = 24;
const TEMPERATURE = 0.45;

type GenOptions = {
  system?: string;
  messages: ChatTurn[];
  maxTokens?: number;
  ageBand?: AgeBand;
  attemptLevel?: number;
  topicFocus?: string;
  questionKind?: Parameters<typeof buildSystemPrompt>[0]["questionKind"];
  groundingNotes?: string;
  conversationRecap?: string;
};

async function chatWithAnthropic(options: {
  apiKey: string;
  model: string;
  system: string;
  messages: ChatTurn[];
  maxTokens: number;
}): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": options.apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: options.model,
      max_tokens: options.maxTokens,
      temperature: TEMPERATURE,
      system: options.system,
      messages: options.messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    }),
  });

  const data = (await res.json()) as {
    content?: Array<{ type?: string; text?: string }>;
    error?: { message?: string };
  };
  if (!res.ok) {
    throw new Error(data.error?.message || `Anthropic error (${res.status})`);
  }
  const text = (data.content || [])
    .map((b) => b.text || "")
    .filter(Boolean)
    .join("\n")
    .trim();
  if (!text) throw new Error("Empty model response");
  return text;
}

async function chatWithOpenAI(options: {
  apiKey: string;
  model: string;
  system: string;
  messages: ChatTurn[];
  maxTokens: number;
}): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${options.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: options.model,
      temperature: TEMPERATURE,
      max_tokens: options.maxTokens,
      messages: [{ role: "system", content: options.system }, ...options.messages],
    }),
  });

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
    error?: { message?: string };
  };
  if (!res.ok) {
    throw new Error(data.error?.message || `OpenAI error (${res.status})`);
  }
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("Empty model response");
  return content;
}

function resolveSystem(options: GenOptions): string {
  return (
    options.system ||
    buildSystemPrompt({
      ageBand: options.ageBand,
      attemptLevel: options.attemptLevel,
      topicFocus: options.topicFocus,
      questionKind: options.questionKind,
      groundingNotes: options.groundingNotes,
      conversationRecap: options.conversationRecap,
    })
  );
}

export async function generateReply(
  options: GenOptions,
): Promise<{ text: string; demo: boolean; provider: string }> {
  const system = resolveSystem(options);
  const maxTokens = options.maxTokens || DEFAULT_MAX_TOKENS;
  const messages = options.messages.slice(-HISTORY_LIMIT);

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) {
    const text = await chatWithAnthropic({
      apiKey: anthropicKey,
      model: resolveAnthropicModel(),
      system,
      messages,
      maxTokens,
    });
    return { text, demo: false, provider: "anthropic" };
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey) {
    const text = await chatWithOpenAI({
      apiKey: openaiKey,
      model: resolveOpenAIModel(),
      system,
      messages,
      maxTokens,
    });
    return { text, demo: false, provider: "openai" };
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content || "";
  const isQuiz =
    system.toLowerCase().includes("quiz") ||
    lastUser.toLowerCase().includes("generate the quiz");
  const topicMatch =
    system.match(/focused on ([^.]+)/i) || system.match(/interest in: ([^.]+)/i);
  return {
    text: isQuiz
      ? demoQuizJson(topicMatch?.[1], hashSeed(lastUser + system))
      : composeDemoReply(lastUser, {
          attemptLevel: options.attemptLevel || 1,
          ageBand: options.ageBand || "explorer",
          history: messages,
          questionKind: options.questionKind,
        }),
    demo: true,
    provider: "demo",
  };
}

function hashSeed(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) || 1;
}

/** OpenAI SSE streaming; falls back to full reply for Anthropic/demo. */
export async function streamReply(
  options: GenOptions,
  onDelta: (chunk: string) => void,
): Promise<{ text: string; demo: boolean; provider: string }> {
  const system = resolveSystem(options);
  const messages = options.messages.slice(-HISTORY_LIMIT);
  const maxTokens = options.maxTokens || DEFAULT_MAX_TOKENS;

  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (openaiKey && !anthropicKey) {
    const model = resolveOpenAIModel();
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: TEMPERATURE,
        max_tokens: maxTokens,
        stream: true,
        messages: [{ role: "system", content: system }, ...messages],
      }),
    });
    if (!res.ok || !res.body) {
      const err = await res.text();
      throw new Error(err || `OpenAI stream error (${res.status})`);
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let full = "";
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const data = trimmed.slice(5).trim();
        if (data === "[DONE]") continue;
        try {
          const json = JSON.parse(data) as {
            choices?: Array<{ delta?: { content?: string } }>;
          };
          const delta = json.choices?.[0]?.delta?.content || "";
          if (delta) {
            full += delta;
            onDelta(delta);
          }
        } catch {
          // ignore partial JSON
        }
      }
    }
    return { text: full.trim(), demo: false, provider: "openai" };
  }

  const result = await generateReply(options);
  const words = result.text.split(/(\s+)/);
  for (const w of words) {
    onDelta(w);
  }
  return result;
}
