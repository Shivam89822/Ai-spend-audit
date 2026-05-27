import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface AuditResponse {
  shareId: string;
  teamSize?: number;
  primaryUseCase: string;
  aiSummary: string;
  recommendations: Array<{
    toolName: string;
    currentPlan: string;
    recommendedPlan?: string;
    alternativeTool?: string;
    action: string;
    monthlySavings: number;
    annualSavings: number;
    confidence: string;
    reason: string;
  }>;
  totals: {
    totalMonthlySpend: number;
    totalMonthlySavings: number;
    totalAnnualSavings: number;
  };
}

export const runAuditRequest = async (
  payload: any
) => {
  const response = await axios.post(
    `${API_BASE_URL}/audit/run`,
    payload
  );

  return response.data;
};

export const getAuditByShareIdRequest = async (
  shareId: string
) => {
  const response = await axios.get(
    `${API_BASE_URL}/audit/${shareId}`
  );

  return response.data;
};

export const createLeadRequest = async (
  payload: {
    email: string;
    companyName?: string;
    role?: string;
    teamSize?: number;
    shareId: string;
    website?: string;
  }
) => {
  const response = await axios.post(
    `${API_BASE_URL}/leads`,
    payload
  );

  return response.data;
};
