import { ToolName, UseCase } from "../../../types/audit.types";

export type PricingType =
  | "seat_based"
  | "usage_based"
  | "enterprise";

export interface IToolPlan {
  name: string;

  monthlyPrice: number;

  pricingType: PricingType;

  recommendedMinTeamSize?: number;

  recommendedMaxTeamSize?: number;

  enterpriseOnly?: boolean;
}

export interface IAlternativeTool {
  toolName: ToolName;

  reason: string;
}

export interface IToolPricingData {
  toolName: ToolName;

  category: string;

  supportedUseCases: UseCase[];

  pricingPageUrl: string;

  verifiedAt: string;

  plans: IToolPlan[];

  alternatives: IAlternativeTool[];
}