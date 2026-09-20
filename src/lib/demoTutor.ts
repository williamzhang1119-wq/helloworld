import type { AgeBand } from "./prompts";
import {
  classifyQuestion,
  extractSimpleMath,
  isFollowUp,
  isGiveUp,
  type ChatTurn,
  type QuestionKind,
} from "./conversation";
import { retrieveKnowledge, type KnowledgeCard } from "./knowledge";

export type DemoOptions = {
  attemptLevel?: number;
  ageBand?: AgeBand;
  history?: ChatTurn[];
  questionKind?: QuestionKind;
};

function lastTurns(history?: ChatTurn[]) {
  const msgs = history || [];
  const lastUser = [...msgs].reverse().find((m) => m.role === "user");
  const lastAssistant = [...msgs].reverse().find((m) => m.role === "assistant");
  return { lastUser, lastAssistant };
}

function pickFact(card: KnowledgeCard, age: AgeBand): string {
  return card.facts[age] || card.facts.explorer;
}

function pickFollow(card: KnowledgeCard, age: AgeBand): string {
  return card.followUp[age] || card.followUp.explorer;
}

function mathLadder(
  expression: string,
  result: number,
  a: number,
  b: number,
  op: string,
  stage: number,
  age: AgeBand,
): string {
  const friendly = Number.isInteger(result) ? String(result) : String(result);
  if (op === "*") {
    const steps = [
      `Math adventure! ${expression} means ${a} equal groups of ${b} (or ${b} groups of ${a}). What's your first guess?`,
      `Light hint: split it. What's ${Math.trunc(a / 10) * 10 || a} × ${b} if you already know a nearby fact?`,
      `Partial step: think ${a} × ${b} as repeated addition of ${b}, ${a} times — or use (${a} − 2) × ${b} plus 2 × ${b} if that helps.`,
      `You're close. Combine the pieces and say the total in one number.`,
      `Reveal: ${expression} = ${friendly}. Can you explain that back as groups or as a split?`,
    ];
    if (a === 12 && b === 8) {
      const classic = [
        "Math adventure! What does multiplying mean in your own words — groups, hops, or something else?",
        "Try a lighter hint: 12 × 8 means 12 groups of 8 (or 8 groups of 12). What's an easier nearby fact you know, like 10 × 8?",
        "Partial step: 10 × 8 = 80. Now what would 2 × 8 add on top of that?",
        "Almost there — combine those pieces. What total do you get?",
        "Reveal: 12 × 8 = 96, because 10×8=80 and 2×8=16, and 80+16=96. Want to try 12 × 9 the same way?",
      ];
      return classic[stage - 1];
    }
    return steps[stage - 1];
  }
  if (op === "+") {
    const tens = Math.floor(a / 10) * 10;
    const steps = [
      `Let's add ${expression}. Do you want to start from ${a} and hop by ${b}, or split into tens and ones?`,
      `Hint: ${a} is ${tens} + ${a - tens}. What do you get if you add ${b} to the friendlier part first?`,
      `Stronger hint: line the ones up, then the tens. What's the ones digit going to be?`,
      `Say your total — I'll help you check it.`,
      `Reveal: ${expression} = ${friendly}. Want a cousin problem next?`,
    ];
    return steps[stage - 1];
  }
  if (op === "-") {
    const steps = [
      `Subtraction quest: ${expression}. Are we taking away, or finding the gap between ${a} and ${b}?`,
      `Hint: count the distance from ${b} up to ${a}, or take ${b} away in friendly chunks.`,
      `Partial step: subtract a round number first if it helps, then fix the extra.`,
      `What number do you land on?`,
      `Reveal: ${expression} = ${friendly}. Can you check it by adding ${b} back?`,
    ];
    return steps[stage - 1];
  }
  const steps = [
    `Division: ${expression} asks how many groups of ${b} fit into ${a} (or how big each group is). What's your guess?`,
    `Hint: think of the times table for ${b}. Which multiple of ${b} is nearest ${a}?`,
    `Stronger hint: ${b} × ? should land on ${a} (or just under, with a remainder).`,
    `What's your answer, including remainder if you need one?`,
    `Reveal: ${expression} = ${friendly}. Want to check it with multiplication?`,
  ];
  if (age === "little") {
    return steps[stage - 1].replace(/remainder/g, "left over");
  }
  return steps[stage - 1];
}

function unknownReply(age: AgeBand, userText: string): string {
  const snippet = userText.replace(/\s+/g, " ").trim().slice(0, 80);
  if (age === "little") {
    return `I don't want to guess about "${snippet}" if I'm not sure. What's one thing you already know about it? Then we can think together.`;
  }
  if (age === "teen") {
    return `I don't have a trusted demo note for "${snippet}", so I won't invent a fact. What do you already think, and which part should we unpack first — the meaning, the cause, or an example?`;
  }
  return `Great question. In demo mode I won't invent a fact about "${snippet}". What's your best guess so far, and what clue in the question feels most important?`;
}

function curiosityFromCard(
  card: KnowledgeCard,
  age: AgeBand,
  stage: number,
  followup: boolean,
): string {
  const fact = pickFact(card, age);
  const follow = pickFollow(card, age);
  if (followup || stage >= 3) {
    return `${fact} ${follow}`;
  }
  if (stage === 1) {
    const spark =
      age === "little"
        ? "Ooh, let's look closely."
        : age === "teen"
          ? "Here's the clear version."
          : "Here's the idea in explorer language.";
    return `${spark} ${fact} ${follow}`;
  }
  return `${fact} If that clicks, try this: ${follow}`;
}

export function composeDemoReply(userText: string, options: DemoOptions = {}): string {
  const age: AgeBand = options.ageBand || "explorer";
  const stage = Math.max(1, Math.min(options.attemptLevel || 1, 5));
  const { lastUser, lastAssistant } = lastTurns(options.history);
  const followup = isFollowUp(userText, lastUser?.content, lastAssistant?.content);
  const kind =
    options.questionKind ||
    (followup ? "followup" : classifyQuestion(userText));

  if (isGiveUp(userText)) {
    const math = extractSimpleMath(lastUser?.content || userText);
    if (math) {
      return `Okay — unlock time. ${math.expression} = ${math.result}. The idea is to see ${math.expression} as a relationship, not a magic trick. Want a cousin problem?`;
    }
    const hits = retrieveKnowledge(lastUser?.content || userText, lastAssistant?.content || "", 1);
    if (hits[0]) {
      return `Okay — here's the missing piece. ${pickFact(hits[0].card, age)} Can you say that back in your own words?`;
    }
    return "Okay — unlock time. Tell me the last clue you already noticed, and I'll fill in only the missing piece so you still own the discovery.";
  }

  const math = extractSimpleMath(userText) || (followup ? extractSimpleMath(lastUser?.content || "") : null);
  if (math && (kind === "practice" || extractSimpleMath(userText))) {
    return mathLadder(math.expression, math.result, math.a, math.b, math.op, stage, age);
  }

  if (kind === "safety") {
    return "If someone might be hurt, that's bigger than a puzzle: tell a trusted adult right now. In the US, 911 is for emergencies and 988 is for feeling in danger of self-harm. I can still help with a calm science question after you're safe.";
  }

  const hay = `${userText} ${followup ? lastUser?.content || "" : ""} ${followup ? lastAssistant?.content || "" : ""}`;
  const hits = retrieveKnowledge(hay, "", 2);

  if (kind === "creative") {
    if (hits[0]) {
      return `Let's make a scene from a real spark: ${pickFact(hits[0].card, age)} What happens next — you choose the path.`;
    }
    return "Picture a map with a tiny door in the corner. You can open it toward stars, a forest, or a workshop. Which way, and who goes with you?";
  }

  if (hits[0]) {
    return curiosityFromCard(hits[0].card, age, stage, followup || kind === "followup");
  }

  return unknownReply(age, userText);
}
