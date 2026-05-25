import {
  IRecommendation,
  IResolvedToolInput,
  UseCase,
} from "../../types/audit.types";

import { pricingData } from "./pricing/pricingData";

import { calculateSavings } from "./savingsCalculator";

import { normalizeText } from "./pricing/pricing.utils";

import type {
  IToolPlan,
  IToolPricingData,
} from "./pricing/pricing.types";

const MIN_SAVINGS_PERCENT = 0.05;

const normalizePlanText = (value: string) => normalizeText(value);

const findToolPricing = (
  toolName: string
): IToolPricingData | undefined => {
  const normalizedToolName = normalizeText(toolName);

  return Object.values(pricingData).find(
    (pricing) =>
      normalizeText(pricing.toolName) ===
      normalizedToolName
  );
};

const calculatePlanScore = (
  plan: IToolPlan,
  pricing: IToolPricingData,
  currentSpend: number,
  planSpend: number,
  teamSize: number,
  primaryUseCase: UseCase
): number => {
  const savingsPct =
    currentSpend > 0
      ? Math.max(
          0,
          (currentSpend - planSpend) / currentSpend
        )
      : 0;

  let score = savingsPct * 100;

  if (
    teamSize >= plan.recommendedMinTeamSize &&
    teamSize <= plan.recommendedMaxTeamSize
  ) {
    score += 20;
  }

  const teamDistance =
    Math.abs(teamSize - plan.recommendedMinTeamSize);
  score += Math.max(0, 10 - teamDistance);

  if (teamSize <= plan.recommendedMaxTeamSize) {
    score += 10;
  } else {
    score -= 10;
  }

  if (
    pricing.supportedUseCases.includes(
      primaryUseCase
    )
  ) {
    score += 10;
  }

  if (plan.pricingType !== "pure_usage") {
    score += 5;
  }

  if (/\b(go|free|hobby|starter)\b/i.test(plan.name)) {
    score -= 15;
  }

  return score;
};

const calculateRecommendationConfidence = (
  savingsPct: number,
  teamSize: number,
  currentPlan: IToolPlan
): "high" | "medium" | "low" => {
  const teamMismatch =
    teamSize < currentPlan.recommendedMinTeamSize ||
    (currentPlan.enterpriseOnly && teamSize < 100);

  if (savingsPct >= 0.25 || teamMismatch) {
    return "high";
  }

  if (savingsPct >= 0.1) {
    return "medium";
  }

  return "low";
};

const generateReason = (
  plan: IToolPlan,
  currentPlan: IToolPlan,
  savingsPct: number,
  teamSize: number
): string => {
  const teamMismatch =
    teamSize < currentPlan.recommendedMinTeamSize;

  if (teamMismatch) {
    return "Current collaboration-focused plan appears oversized for a small team. A lower-cost individual tier is a better fit for the current headcount.";
  }

  if (savingsPct >= 0.25) {
    return `A lower-cost production-ready tier can reduce spend by ${Math.round(
      savingsPct * 100
    )}% while still matching the team size.`;
  }

  if (savingsPct >= 0.1) {
    return "This plan delivers meaningful financial savings while keeping the team on a production-ready tier.";
  }

  return "A more cost-effective production-ready option exists for the current team size and usage profile.";
};

const buildSameToolCandidates = (
  pricing: IToolPricingData,
  currentPlan: IToolPlan,
  tool: IResolvedToolInput,
  teamSize: number,
  primaryUseCase: UseCase
) => {
  const currentSpend = tool.monthlySpend;

  return pricing.plans
    .filter((plan) => {
      const teamSizeWithinSuggestedRange =
        teamSize >= plan.recommendedMinTeamSize &&
        teamSize <= plan.recommendedMaxTeamSize;
      const teamSizeNearRange =
        teamSize >= plan.recommendedMinTeamSize - 1 &&
        teamSize <= plan.recommendedMaxTeamSize + 2;

      return (
        plan.monthlyPrice !== null &&
        plan.isProductionReady &&
        !plan.enterpriseOnly &&
        normalizePlanText(plan.name) !==
          normalizePlanText(currentPlan.name) &&
        (teamSizeWithinSuggestedRange || teamSizeNearRange)
      );
    })
    .map((plan) => {
      const planSpend =
        (plan.monthlyPrice ?? 0) * tool.seats;
      const savings = currentSpend - planSpend;
      const savingsPct =
        currentSpend > 0
          ? Math.max(0, savings / currentSpend)
          : 0;

      return {
        plan,
        planSpend,
        savings,
        savingsPct,
        score: calculatePlanScore(
          plan,
          pricing,
          currentSpend,
          planSpend,
          teamSize,
          primaryUseCase
        ),
      };
    })
    .filter((candidate) => candidate.savings > 0);
};

const buildAlternativeToolCandidates = (
  currentToolName: string,
  currentSpend: number,
  teamSize: number,
  primaryUseCase: UseCase
) => {
  return Object.values(pricingData)
    .filter(
      (pricing) =>
        normalizeText(pricing.toolName) !==
        normalizeText(currentToolName)
    )
    .flatMap((pricing) =>
      pricing.plans
        .filter((plan) => {
          const teamSizeWithinSuggestedRange =
            teamSize >= plan.recommendedMinTeamSize &&
            teamSize <= plan.recommendedMaxTeamSize;
          const teamSizeNearRange =
            teamSize >= plan.recommendedMinTeamSize - 1 &&
            teamSize <= plan.recommendedMaxTeamSize + 2;

          return (
            plan.monthlyPrice !== null &&
            plan.pricingType !== "pure_usage" &&
            plan.isProductionReady &&
            !plan.enterpriseOnly &&
            (teamSizeWithinSuggestedRange || teamSizeNearRange)
          );
        })
        .map((plan) => {
          const planSpend =
            (plan.monthlyPrice ?? 0) * teamSize;
          const savings = currentSpend - planSpend;
          const savingsPct =
            currentSpend > 0
              ? Math.max(0, savings / currentSpend)
              : 0;

          return {
            pricing,
            plan,
            planSpend,
            savings,
            savingsPct,
            score:
              calculatePlanScore(
                plan,
                pricing,
                currentSpend,
                planSpend,
                teamSize,
                primaryUseCase
              ) +
              (pricing.supportedUseCases.includes(
                primaryUseCase
              )
                ? 10
                : 0),
          };
        })
    )
    .filter((candidate) => candidate.savings > 0);
};

export const generateRecommendation = (
  tool: IResolvedToolInput,
  teamSize: number,
  primaryUseCase: UseCase
): IRecommendation => {
  const toolPricing = findToolPricing(tool.toolName);

  if (!toolPricing) {
    return {
      toolName: tool.toolName,
      currentPlan: tool.currentPlan,
      action: "keep",
      monthlySavings: 0,
      annualSavings: 0,
      confidence: "low",
      reason: "Pricing data unavailable.",
    };
  }

  const currentPlan = toolPricing.plans.find(
    (plan) =>
      normalizePlanText(plan.name) ===
      normalizePlanText(tool.currentPlan)
  );

  if (!currentPlan) {
    return {
      toolName: tool.toolName,
      currentPlan: tool.currentPlan,
      action: "keep",
      monthlySavings: 0,
      annualSavings: 0,
      confidence: "low",
      reason:
        "Current plan could not be validated.",
    };
  }

  const currentSpend = tool.monthlySpend;
  const teamMismatch =
    teamSize < currentPlan.recommendedMinTeamSize ||
    (currentPlan.enterpriseOnly && teamSize < 100);

  const sameToolCandidates = buildSameToolCandidates(
    toolPricing,
    currentPlan,
    tool,
    teamSize,
    primaryUseCase
  );

  const bestSameToolCandidate = sameToolCandidates.sort(
    (a, b) =>
      b.score - a.score || b.savings - a.savings
  )[0];

  if (
    bestSameToolCandidate &&
    (bestSameToolCandidate.savingsPct >= MIN_SAVINGS_PERCENT ||
      teamMismatch)
  ) {
    const savings = calculateSavings(
      currentSpend,
      bestSameToolCandidate.planSpend
    );

    return {
      toolName: tool.toolName,
      currentPlan: currentPlan.name,
      recommendedPlan: bestSameToolCandidate.plan.name,
      action: "downgrade",
      monthlySavings: savings.monthlySavings,
      annualSavings: savings.annualSavings,
      confidence: calculateRecommendationConfidence(
        bestSameToolCandidate.savingsPct,
        teamSize,
        currentPlan
      ),
      reason: generateReason(
        bestSameToolCandidate.plan,
        currentPlan,
        bestSameToolCandidate.savingsPct,
        teamSize
      ),
    };
  }

  const alternativeCandidates = buildAlternativeToolCandidates(
    tool.toolName,
    currentSpend,
    teamSize,
    primaryUseCase
  );

  const bestAlternative = alternativeCandidates.sort(
    (a, b) =>
      b.score - a.score || b.savings - a.savings
  )[0];

  if (bestAlternative && bestAlternative.savingsPct >= 0.1) {
    const savings = calculateSavings(
      currentSpend,
      bestAlternative.planSpend
    );

    return {
      toolName: tool.toolName,
      currentPlan: currentPlan.name,
      recommendedPlan: bestAlternative.plan.name,
      alternativeTool: bestAlternative.pricing.toolName,
      action: "switch",
      monthlySavings: savings.monthlySavings,
      annualSavings: savings.annualSavings,
      confidence: calculateRecommendationConfidence(
        bestAlternative.savingsPct,
        teamSize,
        currentPlan
      ),
      reason: `A lower-cost production-ready alternative is available with ${bestAlternative.pricing.toolName}. This option still supports the current team size and use case.`,
    };
  }

  return {
    toolName: tool.toolName,
    currentPlan: currentPlan.name,
    action: "keep",
    monthlySavings: 0,
    annualSavings: 0,
    confidence: "high",
    reason:
      "Current setup appears financially reasonable.",
  };
};
