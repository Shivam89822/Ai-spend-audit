import {
  IRecommendation,
  IResolvedToolInput,
  UseCase,
} from "../../types/audit.types";

import { generateRecommendation } from "./recommendationEngine";

export interface IAuditInput {
  teamSize: number;

  primaryUseCase: UseCase;

  tools: IResolvedToolInput[];
}

export interface IAuditResult {
  recommendations: IRecommendation[];

  totalMonthlySpend: number;

  totalMonthlySavings: number;

  totalAnnualSavings: number;
}

export const runAudit = (
  input: IAuditInput
): IAuditResult => {
  const recommendations: IRecommendation[] = [];

  let totalMonthlySpend = 0;

  let totalMonthlySavings = 0;

  let totalAnnualSavings = 0;

  for (const tool of input.tools) {
    totalMonthlySpend += tool.monthlySpend;

    const recommendation = generateRecommendation(
      tool,
      input.teamSize,
      input.primaryUseCase
    );

    totalMonthlySavings +=
      recommendation.monthlySavings;

    totalAnnualSavings +=
      recommendation.annualSavings;

    recommendations.push(recommendation);
  }

  return {
    recommendations,

    totalMonthlySpend,

    totalMonthlySavings,

    totalAnnualSavings,
  };
};
