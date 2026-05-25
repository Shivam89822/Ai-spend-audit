import { describe, expect, it } from "vitest";

import { runAudit } from "../services/audit/auditEngine";
import { buildFallbackSummary } from "../services/ai/generateSummary";

describe("AuditEngine", () => {
  it("calculates totals and recommendations", () => {
    const result = runAudit({
      teamSize: 10,
      primaryUseCase: "coding",
      tools: [
        {
          toolName: "Cursor",
          currentPlan: "Pro",
          monthlySpend: 200,
          seats: 10,
        },
        {
          toolName: "ChatGPT",
          currentPlan: "Business",
          monthlySpend: 200,
          seats: 8,
        },
      ],
    });

    expect(result.totalMonthlySpend).toBe(400);
    expect(result.recommendations.length).toBe(2);
    expect(result.totalAnnualSavings).toBeGreaterThanOrEqual(0);
  });

  it("builds a readable fallback summary", () => {
    const input = {
      teamSize: 5,
      primaryUseCase: "research" as const,
      tools: [
        {
          toolName: "Gemini" as const,
          currentPlan: "Gemini Advanced",
          monthlySpend: 100,
          seats: 5,
        },
      ],
    };

    const result = runAudit(input);
    const summary = buildFallbackSummary(input, result);

    expect(summary).toContain("research team");
    expect(summary).toContain("$100");
    expect(summary.length).toBeGreaterThan(40);
  });
});
