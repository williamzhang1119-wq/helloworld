export type QuestionKind = "practice" | "curiosity" | "safety" | "creative" | "followup";

export type ChatTurn = { role: "user" | "assistant"; content: string };

const STOP = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "to",
  "of",
  "in",
  "on",
  "for",
  "is",
  "it",
  "do",
  "does",
  "did",
  "why",
  "how",
  "what",
  "when",
  "where",
  "who",
  "can",
  "you",
  "we",
  "i",
  "me",
  "my",
  "that",
  "this",
  "with",
  "from",
  "about",
  "please",
  "just",
  "tell",
]);

const SHORT_FOLLOW_RE =
  /^(why|how|what|and|so|because|then|ok|okay|yes|yeah|yep|nope|no|wait|but|also|more|hmm|right|really|explain|go on)[\s?!.]*$/i;

const FOLLOW_RE =
  /^(what about|how come|and then|tell me more|what if|is that|does that|can you explain|could you explain|say that|and\b|so\b|because\b|then\b|but\b|also\b)/i;

const SAFETY_RE =
  /\b(911|999|988|emergency|poison|poisonous|venomous|dangerous\s+to\s+(touch|eat|me)|am i safe|hurt myself|bleeding)\b/i;

const PRACTICE_RE =
  /\b(homework|solve|work out|calculate|what(?:'s| is)\s+\d|spell|conjugate|times table|show your work|check my)\b/i;

const CREATIVE_RE =
  /\b(story|pretend|imagine|make believe|adventure recap|once upon)\b/i;

const GIVE_UP_RE = /\b((just\s+)?tell me( the)? answer|i give up|what is the answer)\b/i;

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w));
}

export function isGiveUp(text: string): boolean {
  return GIVE_UP_RE.test(text.toLowerCase());
}

export function classifyQuestion(text: string): QuestionKind {
  const t = text.trim();
  if (!t) return "curiosity";
  if (SAFETY_RE.test(t)) return "safety";
  if (CREATIVE_RE.test(t)) return "creative";
  if (PRACTICE_RE.test(t) || extractSimpleMath(t)) return "practice";
  return "curiosity";
}

export function isFollowUp(
  text: string,
  previousUser?: string | null,
  previousAssistant?: string | null,
): boolean {
  if (!previousUser) return false;
  const t = text.trim();
  if (!t) return false;
  if (t.length <= 36 && SHORT_FOLLOW_RE.test(t)) return true;
  if (FOLLOW_RE.test(t)) return true;
  if (/\b(that|those|them|it|this)\b/i.test(t) && t.length < 90) return true;

  const prev = new Set(tokenize(`${previousUser} ${previousAssistant || ""}`));
  const next = tokenize(t);
  if (!next.length || !prev.size) return false;
  const overlap = next.filter((w) => prev.has(w)).length;
  return overlap / next.length >= 0.4;
}

export function shouldResetHintLadder(
  text: string,
  activeQuestion: string | null,
  lastAssistant?: string | null,
): boolean {
  if (!activeQuestion) return true;
  if (isGiveUp(text)) return false;
  if (isFollowUp(text, activeQuestion, lastAssistant)) return false;
  if (classifyQuestion(text) === "practice" && !extractSimpleMath(activeQuestion || "")) {
    return true;
  }
  if (text.includes("?") && text.length > 16 && !isFollowUp(text, activeQuestion, lastAssistant)) {
    return true;
  }
  const prevTokens = new Set(tokenize(activeQuestion));
  const nextTokens = tokenize(text);
  const overlap = nextTokens.filter((w) => prevTokens.has(w)).length;
  if (nextTokens.length >= 2 && overlap === 0) return true;
  return false;
}

export function recapConversation(messages: ChatTurn[], limit = 8): string {
  const recent = messages.slice(-limit);
  if (!recent.length) return "";
  return recent
    .map((m) => {
      const who = m.role === "user" ? "Learner" : "Venture";
      const clipped = m.content.replace(/\s+/g, " ").trim().slice(0, 280);
      return `- ${who}: ${clipped}`;
    })
    .join("\n");
}

export type SimpleMath = {
  a: number;
  b: number;
  op: "+" | "-" | "*" | "/";
  expression: string;
  result: number;
};

export function extractSimpleMath(text: string): SimpleMath | null {
  const normalized = text
    .toLowerCase()
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/\btimes\b/g, "*")
    .replace(/\bmultiplied by\b/g, "*")
    .replace(/\bplus\b/g, "+")
    .replace(/\badded to\b/g, "+")
    .replace(/\bminus\b/g, "-")
    .replace(/\bsubtract(?:ed)?\b/g, "-")
    .replace(/\bdivided by\b/g, "/")
    .replace(/\bx\b/g, "*")
    .replace(/(\d)x(\d)/g, "$1*$2");

  const match = normalized.match(
    /(-?\d{1,4}(?:\.\d{1,2})?)\s*([*+\-/])\s*(-?\d{1,4}(?:\.\d{1,2})?)/,
  );
  if (!match) return null;
  const a = Number(match[1]);
  const b = Number(match[3]);
  const op = match[2] as SimpleMath["op"];
  if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
  if (Math.abs(a) > 9999 || Math.abs(b) > 9999) return null;
  if (op === "/" && b === 0) return null;

  let result: number;
  if (op === "+") result = a + b;
  else if (op === "-") result = a - b;
  else if (op === "*") result = a * b;
  else result = a / b;

  if (!Number.isFinite(result)) return null;
  const rounded = Number.isInteger(result) ? result : Math.round(result * 1000) / 1000;
  const symbol = op === "*" ? "×" : op === "/" ? "÷" : op;
  return { a, b, op, expression: `${a} ${symbol} ${b}`, result: rounded };
}

export function inferTopicLabel(text: string): string | undefined {
  const t = text.toLowerCase();
  const map: Array<[string, string[]]> = [
    ["science", ["science", "gravity", "atom", "magnet", "photosynthesis", "electric", "chemical"]],
    ["nature", ["animal", "plant", "ocean", "forest", "dinosaur", "insect", "bee", "tree"]],
    ["space", ["space", "planet", "star", "moon", "galaxy", "astronaut", "rocket"]],
    ["history", ["history", "ancient", "pyramid", "empire", "pharaoh", "roman", "castle"]],
    ["geography", ["continent", "equator", "map", "country", "river", "mountain", "desert", "ocean"]],
    ["math", ["math", "fraction", "multiply", "divide", "equation", "geometry", "number"]],
    ["languages", ["language", "spanish", "french", "word", "alphabet", "grammar", "translate"]],
    ["arts", ["art", "paint", "color", "draw", "museum", "sculpture"]],
    ["music", ["music", "song", "piano", "guitar", "rhythm", "note", "instrument"]],
    ["sports", ["sport", "soccer", "basketball", "olympics", "team", "athlete"]],
    ["tech", ["computer", "code", "robot", "internet", "app", "software"]],
    ["school", ["homework", "essay", "paragraph", "study", "school"]],
    ["hobbies", ["hobby", "chess", "garden", "cook", "collect"]],
    ["culture", ["festival", "holiday", "tradition", "culture", "food around"]],
    ["how things work", ["how does", "how do", "how things", "machine", "engine", "fridge", "plane"]],
  ];
  for (const [label, keys] of map) {
    if (keys.some((k) => t.includes(k))) return label;
  }
  return undefined;
}
