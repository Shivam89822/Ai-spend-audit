import { pricingData } from "../services/audit/pricing/pricingData";
import { normalizeText } from "../services/audit/pricing/pricing.utils";

export const validateAuditInput = (
  body: any
): string | null => {
  if (!body.teamSize) {
    return "Team size is required.";
  }

  if (!body.primaryUseCase) {
    return "Primary use case is required.";
  }

  if (!Array.isArray(body.tools)) {
    return "Tools array is required.";
  }

  if (body.tools.length === 0) {
    return "At least one tool is required.";
  }

  for (const tool of body.tools) {
    if (!tool?.toolName || !tool?.currentPlan) {
      return "Each tool must include a valid name and plan.";
    }

    if (
      typeof tool.seats !== "number" ||
      tool.seats < 1
    ) {
      return `Seats must be at least 1 for ${tool.toolName}.`;
    }

    const pricingRecord = Object.values(pricingData).find(
      (pricing) =>
        normalizeText(pricing.toolName) ===
        normalizeText(tool.toolName)
    );

    if (!pricingRecord) {
      return `Unsupported tool: ${tool.toolName}.`;
    }

    const matchingPlan = pricingRecord.plans.find(
      (plan) =>
        normalizeText(plan.name) ===
        normalizeText(tool.currentPlan)
    );

    if (!matchingPlan) {
      return `Unsupported plan "${tool.currentPlan}" for ${tool.toolName}.`;
    }
  }

  return null;
};
