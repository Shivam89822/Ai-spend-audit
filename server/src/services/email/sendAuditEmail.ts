import type { IAudit } from "../../models/Audit";

export const sendAuditEmail = async (
  to: string,
  audit: IAudit
): Promise<void> => {
  const lines = [
    `To: ${to}`,
    `Audit: ${audit.shareId}`,
    `Monthly spend: ${audit.totals.totalMonthlySpend}`,
    `Monthly savings: ${audit.totals.totalMonthlySavings}`,
    `Annual savings: ${audit.totals.totalAnnualSavings}`,
    `Summary: ${audit.aiSummary}`,
  ];

  console.log(lines.join("\n"));
};

export const sendAuditSummary = async (
  to: string,
  summary: string
): Promise<void> => {
  console.log(`Summary email to ${to}\n${summary}`);
};
