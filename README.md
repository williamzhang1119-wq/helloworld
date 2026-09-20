# Venture 1 — advanced kid-safe AI tutor

Every question is an adventure. Venture 1 is a **wide-knowledge, kid-safe tutor**: clear explanations, conversation memory, age-banded wording, a **hint ladder** for practice problems, XP/streaks, guided adventures, quizzes, and a parent report.

## What's new in v2.1

- Smarter chat: stronger reasoning, clearer explanations, and follow-ups that use the whole conversation
- Wider subject map (science, nature, history, geography, math, languages, arts, music, sports, tech, school, hobbies, how things work, culture)
- Age bands change **depth and wording**, not which topics are allowed
- Knowledge grounding notes so answers stay factual; the tutor admits uncertainty instead of inventing
- Server-side model defaults (`ANTHROPIC_MODEL` / `OPENAI_MODEL`) — the browser no longer picks a model id
- Richer demo mode when no API key is set (grounded replies + broader quizzes)

## Age bands (v2)

- Little Explorer / Explorer / Teen Explorer
- Hint ladder stages 1–5 (for practice / homework-style problems)
- Streaming replies
- XP, levels, and daily streaks
- Daily challenge + guided multi-step adventures
- Topic-focused quizzes
- Parent report (local progress summary)
- Passport stamps, voice input, read-aloud

## Local development

```bash
cp .env.example .env.local
# Optional: ANTHROPIC_API_KEY (preferred) or OPENAI_API_KEY
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without an API key, demo mode still works (including grounded explanations, staged math hints, and quizzes).

```bash
npm test
npm run build
```

## Deploy on Railway

1. New Project → Deploy from GitHub → this repo
2. Variables:
   - `ANTHROPIC_API_KEY` (preferred)
   - `ANTHROPIC_MODEL` (optional; default `claude-sonnet-4-6`)
   - or `OPENAI_API_KEY` (also enables moderation + true token streaming)
   - `OPENAI_MODEL` (optional; default `gpt-4o-mini`)
3. Enable public networking
4. Health: `GET /api/health` → should list `"features"` and `demoMode`
