import {
  IResolvedToolInput,
  IToolInput,
} from "../../../types/audit.types";
import { normalizeText } from "./pricing.utils";
import { pricingData } from "./pricingData";

const findPricingRecord = (toolName: string) => {
  const normalizedToolName = normalizeText(toolName);

  return Object.values(pricingData).find(
    (pricing) =>
      normalizeText(pricing.toolName) ===
      normalizedToolName
  );
};

export const resolveAuditPricing = (
  tools: IToolInput[]
): IResolvedToolInput[] => {
  return tools.map((tool) => {
    const pricingRecord = findPricingRecord(
      tool.toolName
    );

    if (!pricingRecord) {
      throw new Error(
        `Unsupported tool: ${tool.toolName}`
      );
    }

    const plan = pricingRecord.plans.find(
      (candidate) =>
        normalizeText(candidate.name) ===
        normalizeText(tool.currentPlan)
    );

    if (!plan) {
      throw new Error(
        `Unsupported plan "${tool.currentPlan}" for ${tool.toolName}`
      );
    }

    return {
      ...tool,
      monthlySpend:
        (plan.monthlyPrice ?? 0) * tool.seats,
    };
  });
};
