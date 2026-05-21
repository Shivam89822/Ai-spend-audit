import { ToolName, UseCase } from "../../../types/audit.types";

export interface ITokenPricing {
  inputPerMillion: number;
  outputPerMillion: number;
  cacheWritePerMillion?: number;
  cacheReadPerMillion?: number;
}

export interface IUsagePricing {
  tokens?: Record<string, ITokenPricing>;
  addOns?: Record<string, { price: number; unit: string }>;
  customNotes?: string;
}

export interface IToolPlan {
  name: string;

  monthlyPrice: number | null;

  pricingType:
    | "seat_flat"
    | "seat_plus_usage"
    | "pure_usage"
    | "hybrid";

  isProductionReady: boolean;

  recommendedMinTeamSize: number;

  recommendedMaxTeamSize: number;

  enterpriseOnly: boolean;

  includedCredits?: number;

  isAnnualOnly?: boolean;

  notes: string;

  usagePricing?: IUsagePricing;
}

export interface IAlternativeTool {
  toolName: ToolName;

  reason: string;
}

export interface IRecommendationMetadata {
  canDowngradeTo?: string;
  canUpgradeTo?: string;
  alternativeTools: string[];
  teamSizeTriggers: {
    min: number;
    max: number;
    action: "downgrade" | "upgrade" | "consolidate" | "switch_to_enterprise";
  }[];
  featureFlagsRequired?: string[];
}

export interface IToolPricingData {
  toolName: ToolName;
  category: "ai_assistant" | "ai_code_editor" | "ai_api";
  supportedUseCases: string[];
  pricingPageUrl: string;
  verifiedAt: string;
  plans: IToolPlan[];
  recommendationMetadata: IRecommendationMetadata;
}