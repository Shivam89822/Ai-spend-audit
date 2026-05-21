export interface ISavingsResult {
  monthlySavings: number;
  annualSavings: number;
}

export const calculateSavings = (
  currentMonthlySpend: number,
  recommendedMonthlySpend: number
): ISavingsResult => {
  const monthlySavings = Math.max(
    currentMonthlySpend - recommendedMonthlySpend,
    0
  );

  const annualSavings = monthlySavings * 12;

  return {
    monthlySavings,
    annualSavings,
  };
};