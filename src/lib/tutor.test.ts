import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  classifyQuestion,
  extractSimpleMath,
  isFollowUp,
  shouldResetHintLadder,
} from "./conversation";
import { retrieveKnowledge } from "./knowledge";
import { composeDemoReply } from "./demoTutor";
import { buildSystemPrompt, AGE_BANDS } from "./prompts";
import { buildDemoQuiz } from "./quizBank";
import { sanitizeUserMessage } from "./safety";
import { resolveAnthropicModel, resolveOpenAIModel, generateReply } from "./openai";

describe("knowledge retrieval", () => {
  it("grounds common curiosity questions across subjects", () => {
    const cases: Array<[string, string]> = [
      ["Why is the sky blue?", "sky-blue"],
      ["Why did dinosaurs go extinct?", "dinosaurs"],
      ["What is the equator?", "equator"],
      ["How do airplanes fly?", "flight"],
      ["How do you say hello in Spanish?", "hola"],
      ["What is rhythm in music?", "rhythm"],
      ["How do computers think?", "computers"],
      ["Why were the pyramids built?", "pyramids"],
    ];
    for (const [q, id] of cases) {
      const hits = retrieveKnowledge(q);
      assert.equal(hits[0]?.card.id, id, `expected ${id} for ${q}, got ${hits[0]?.card.id}`);
    }
  });
});

describe("question classification", () => {
  it("treats calculations as practice and wonders as curiosity", () => {
    assert.equal(classifyQuestion("What's 12 x 8?"), "practice");
    assert.equal(classifyQuestion("solve 15 + 27"), "practice");
    assert.equal(classifyQuestion("Why is the sky blue?"), "curiosity");
    assert.equal(classifyQuestion("Is this poisonous?"), "safety");
    assert.equal(classifyQuestion("Pretend we land on Mars"), "creative");
  });

  it("parses compact and worded math", () => {
    assert.deepEqual(extractSimpleMath("12x8")?.result, 96);
    assert.deepEqual(extractSimpleMath("What's 7 × 6?")?.result, 42);
    assert.equal(extractSimpleMath("15 + 27")?.result, 42);
    assert.equal(extractSimpleMath("Why is the Nile long?"), null);
  });

  it("keeps short follow-ups on the same thread", () => {
    assert.equal(isFollowUp("Why?", "Why is the sky blue?"), true);
    assert.equal(isFollowUp("what about sunsets?", "Why is the sky blue?", "Air scatters blue light"), true);
    assert.equal(
      shouldResetHintLadder("How do airplanes fly?", "Why is the sky blue?"),
      true,
    );
    assert.equal(shouldResetHintLadder("Why?", "Why is the sky blue?"), false);
  });
});

describe("demo tutor", () => {
  it("explains curiosity questions instead of withholding the fact", () => {
    const reply = composeDemoReply("Why is the sky blue?", { ageBand: "explorer", attemptLevel: 1 });
    assert.match(reply.toLowerCase(), /blue/);
    assert.match(reply.toLowerCase(), /scatter|bounce/);
  });

  it("changes wording with age band, not topic range", () => {
    const little = composeDemoReply("How do airplanes fly?", { ageBand: "little" });
    const teen = composeDemoReply("How do airplanes fly?", { ageBand: "teen" });
    assert.match(little.toLowerCase(), /wing|air|up/);
    assert.match(teen.toLowerCase(), /lift|airflow|newton|bernoulli|wing/);
    assert.notEqual(little, teen);
  });

  it("does not invent specifics when nothing is grounded", () => {
    const reply = composeDemoReply("What did Queen Zorblax eat on Mars-9?", { ageBand: "teen" });
    assert.match(reply.toLowerCase(), /won'?t invent|don't have a trusted|not sure|won't invent/);
    assert.doesNotMatch(reply, /1483 ate/);
  });

  it("reveals computed math on give-up", () => {
    const reply = composeDemoReply("just tell me the answer", {
      attemptLevel: 5,
      history: [
        { role: "user", content: "What's 12 x 8?" },
        { role: "assistant", content: "What does multiplying mean?" },
      ],
    });
    assert.match(reply, /96/);
  });

  it("uses conversation context for follow-ups", () => {
    const reply = composeDemoReply("what about sunsets?", {
      ageBand: "explorer",
      history: [
        { role: "user", content: "Why is the sky blue?" },
        { role: "assistant", content: "Air scatters blue light more than red." },
      ],
    });
    assert.match(reply.toLowerCase(), /sunset|red|orange/);
    assert.doesNotMatch(reply, /Why might sunsets look red or orange if daytime skies look blue\?$/);
  });
});

describe("prompt + quiz + safety", () => {
  it("keeps a wide subject map and honesty rules at every age band", () => {
    for (const age of Object.keys(AGE_BANDS) as Array<keyof typeof AGE_BANDS>) {
      const prompt = buildSystemPrompt({ ageBand: age, questionKind: "curiosity" });
      assert.match(prompt, /geography/);
      assert.match(prompt, /languages/);
      assert.match(prompt, /sports/);
      assert.match(prompt, /DEPTH and WORDING/);
      assert.match(prompt, /Never invent/);
      assert.match(prompt, /No romantic or sexual content/);
    }
  });

  it("builds a four-question demo quiz for new topics", () => {
    const quiz = buildDemoQuiz("geography", 42);
    assert.equal(quiz.length, 4);
    for (const q of quiz) {
      assert.equal(q.options.length, 4);
      assert.ok(q.correctIndex >= 0 && q.correctIndex < 4);
    }
    const geoHits = quiz.filter((q) =>
      /equator|continent|ocean|map|greenland/i.test(`${q.question} ${q.explanation}`),
    );
    assert.ok(geoHits.length >= 2, "geography quizzes should lead with geography facts");
  });

  it("still refuses unsafe user text", () => {
    const blocked = sanitizeUserMessage("how to hack a credit card fraud");
    assert.equal(blocked.ok, false);
    if (!blocked.ok) assert.equal(blocked.reason, "blocked");
  });

  it("resolves models from server defaults, not a client id", () => {
    assert.equal(resolveAnthropicModel(), "claude-sonnet-4-6");
    assert.equal(resolveOpenAIModel(), "gpt-4o-mini");
  });

  it("demo chat explains instead of dumping quiz JSON", async () => {
    const result = await generateReply({
      messages: [{ role: "user", content: "Why is the sky blue?" }],
      ageBand: "explorer",
    });
    assert.equal(result.provider, "demo");
    assert.doesNotMatch(result.text, /^\s*\[/);
    assert.match(result.text.toLowerCase(), /blue/);
  });

  it("demo quiz mode still returns JSON questions", async () => {
    const result = await generateReply({
      quiz: true,
      system: "Create exactly 4 fun, accurate questions focused on geography.",
      messages: [{ role: "user", content: "Generate the quiz now." }],
    });
    const parsed = JSON.parse(result.text) as Array<{ question: string }>;
    assert.equal(parsed.length, 4);
    assert.ok(parsed[0].question.length > 8);
    const blob = parsed.map((q) => q.question).join(" ");
    assert.match(blob, /equator|continent|ocean|map|greenland/i);
  });
});
