import { runAudit } from "./services/audit/auditEngine";
import { resolveAuditPricing } from "./services/audit/pricing/resolveAuditPricing";

const auditResult = runAudit({
  teamSize: 2,

  primaryUseCase: "coding",

  tools: resolveAuditPricing([
    {
      toolName: "Cursor",

      currentPlan: "Teams",

      seats: 2,
    },

    {
      toolName: "ChatGPT",

      currentPlan: "Business",

      seats: 2,
    },
  ]),
});

console.log(JSON.stringify(auditResult, null, 2));
