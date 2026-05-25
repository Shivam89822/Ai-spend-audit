import { describe, expect, it } from "vitest";

import { runAudit } from "../services/audit/auditEngine";
import { buildFallbackSummary } from "../services/ai/generateSummary";
import { resolveAuditPricing } from "../services/audit/pricing/resolveAuditPricing";

describe("AuditEngine", () => {
  it("calculates totals and recommendations", () => {
    const result = runAudit({
      teamSize: 10,
      primaryUseCase: "coding",
      tools: resolveAuditPricing([
        {
          toolName: "Cursor",
          currentPlan: "Pro",
          seats: 10,
        },
        {
          toolName: "ChatGPT",
          currentPlan: "Business",
          seats: 8,
        },
      ]),
    });

    expect(result.totalMonthlySpend).toBe(400);
    expect(result.recommendations.length).toBe(2);
    expect(result.totalAnnualSavings).toBeGreaterThanOrEqual(0);
  });

  it("builds a readable fallback summary", () => {
    const input = {
      teamSize: 5,
      primaryUseCase: "research" as const,
      tools: resolveAuditPricing([
        {
          toolName: "Gemini" as const,
          currentPlan: "Gemini Advanced",
          seats: 5,
        },
      ]),
    };

    const result = runAudit(input);
    const summary = buildFallbackSummary(input, result);

    expect(summary).toContain("research team");
    expect(summary).toContain("$100");
    expect(summary.length).toBeGreaterThan(40);
  });
});
