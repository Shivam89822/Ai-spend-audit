import { runAudit } from "./services/audit/auditEngine";

const auditResult = runAudit({
  teamSize: 2,

  primaryUseCase: "coding",

  tools: [
    {
      toolName: "Cursor",

      currentPlan: "Teams",

      monthlySpend: 80,

      seats: 2,
    },

    {
      toolName: "ChatGPT",

      currentPlan: "Business",

      monthlySpend: 60,

      seats: 2,
    },
  ],
});

console.log(JSON.stringify(auditResult, null, 2));