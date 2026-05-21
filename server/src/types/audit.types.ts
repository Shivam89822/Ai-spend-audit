export type ToolName =
  | "Cursor"
  | "GitHub Copilot"
  | "Claude"
  | "ChatGPT"
  | "Anthropic API"
  | "OpenAI API"
  | "Gemini"
  | "Windsurf";

export type UseCase =
  | "coding"
  | "writing"
  | "research"
  | "data"
  | "mixed";

export type RecommendationAction =
  | "keep"
  | "downgrade"
  | "switch"
  | "move-to-credits";

export type RecommendationConfidence =
  | "high"
  | "medium"
  | "low";

export interface IToolInput {
  toolName: ToolName;
  currentPlan: string;
  monthlySpend: number;
  seats: number;
}

export interface IRecommendation {
  toolName: ToolName;

  currentPlan: string;

  recommendedPlan?: string;

  alternativeTool?: string;

  action: RecommendationAction;

  monthlySavings: number;

  annualSavings: number;

  confidence: RecommendationConfidence;

  reason: string;
}

export interface IAuditTotals {
  totalMonthlySpend: number;

  totalMonthlySavings: number;

  totalAnnualSavings: number;
}