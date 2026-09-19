# Venture 1 — kid-safe AI tutor

Every question is an adventure. Venture 1 guides kids with hints and questions — it does not hand over answers right away.

Features: compass mascot, explorer meter, passport stamps, Quiz Me, voice input/read-aloud, and Socratic tutoring.

## Local development

```bash
cp .env.example .env.local
# Optional: ANTHROPIC_API_KEY (preferred) or OPENAI_API_KEY
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without an API key, demo mode still works for chat + quizzes.

## Deploy on Railway

1. New Project → Deploy from GitHub → select this repo
2. Variables:
   - `ANTHROPIC_API_KEY` (preferred, Claude)
   - or `OPENAI_API_KEY`
3. Public networking → open the generated URL

Health check: `GET /api/health`
