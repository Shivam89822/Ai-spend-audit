import { pricingData } from "./pricingData";

export const getPlanPrice = (
  toolName: string,
  planName: string
): number | null => {
  const tool = pricingData[toolName];

  if (!tool) {
    return null;
  }

  const plan = tool.plans.find(
    (item) => item.name.toLowerCase() === planName.toLowerCase()
  );

  return plan ? plan.monthlyPrice : null;
};

export const findCheaperPlan = (
  toolName: string,
  currentPlan: string,
  teamSize: number
) => {
  const tool = pricingData[toolName];

  if (!tool) {
    return null;
  }

  const current = tool.plans.find(
    (plan) => plan.name.toLowerCase() === currentPlan.toLowerCase()
  );

  if (!current) {
    return null;
  }

  const cheaperPlan = tool.plans.find((plan) => {
    return (
      plan.monthlyPrice < current.monthlyPrice &&
      (!plan.recommendedMaxTeamSize ||
        teamSize <= plan.recommendedMaxTeamSize)
    );
  });

  return cheaperPlan || null;
};

export const calculateSavings = (
  currentSpend: number,
  recommendedSpend: number
) => {
  const monthlySavings = Math.max(
    currentSpend - recommendedSpend,
    0
  );

  const annualSavings = monthlySavings * 12;

  return {
    monthlySavings,
    annualSavings,
  };
};