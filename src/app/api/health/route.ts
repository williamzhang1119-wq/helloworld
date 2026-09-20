import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/openai";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "venture-1",
    version: "2.1.0",
    demoMode: isDemoMode(),
    features: [
      "age-bands",
      "hint-ladder",
      "streaming",
      "passport",
      "quiz",
      "adventures",
      "daily-challenge",
      "parent-report",
      "xp-streaks",
      "knowledge-grounding",
      "wide-subjects",
      "conversation-memory",
    ],
  });
}
