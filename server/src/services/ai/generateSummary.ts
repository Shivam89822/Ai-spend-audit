import { IAuditInput, IAuditResult } from "../audit/auditEngine";
import { env, hasGeminiConfig } from "../../config/env";

interface GeminiPart {
  text?: string;
}

interface GeminiCandidate {
  content?: {
    parts?: GeminiPart[];
  };
}

interface GeminiResponse {
  candidates?: GeminiCandidate[];
}

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const buildFallbackSummary = (
  auditInput: IAuditInput,
  auditResult: IAuditResult
): string => {
  const topRecommendation = auditResult.recommendations
    .slice()
    .sort(
      (left, right) =>
        right.monthlySavings - left.monthlySavings
    )[0];

  const recommendationLine = topRecommendation
    ? `The highest-impact opportunity is ${topRecommendation.toolName}, with an estimated ${formatCurrency(
        topRecommendation.monthlySavings
      )}/month in savings from a ${topRecommendation.action} recommendation.`
    : "No recommendation opportunities were identified in this audit.";

  return [
    `This ${auditInput.primaryUseCase} team is spending ${formatCurrency(
      auditResult.totalMonthlySpend
    )} per month across ${auditInput.tools.length} AI tool${
      auditInput.tools.length === 1 ? "" : "s"
    } for ${auditInput.teamSize} seat${
      auditInput.teamSize === 1 ? "" : "s"
    }.`,
    `The audit estimates ${formatCurrency(
      auditResult.totalMonthlySavings
    )}/month and ${formatCurrency(
      auditResult.totalAnnualSavings
    )}/year in recoverable savings.`,
    recommendationLine,
  ].join(" ");
};

const buildGeminiPrompt = (
  auditInput: IAuditInput,
  auditResult: IAuditResult
): string => {
  const toolLines = auditInput.tools.map((tool) => {
    const recommendation =
      auditResult.recommendations.find(
        (item) => item.toolName === tool.toolName
      );

    return [
      `Tool: ${tool.toolName}`,
      `Plan: ${tool.currentPlan}`,
      `Seats: ${tool.seats}`,
      `Monthly spend: ${formatCurrency(tool.monthlySpend)}`,
      `Recommended action: ${recommendation?.action || "keep"}`,
      `Estimated monthly savings: ${formatCurrency(
        recommendation?.monthlySavings || 0
      )}`,
      `Reason: ${recommendation?.reason || "No change recommended."}`,
    ].join(" | ");
  });

  return [
    "You are generating a short executive summary for an AI spend audit.",
    "Write exactly one paragraph in plain English.",
    "Keep it between 90 and 130 words.",
    "Mention the current monthly spend, estimated monthly savings, estimated annual savings, and the most important optimization opportunity.",
    "Do not use markdown, bullets, or headings.",
    `Primary use case: ${auditInput.primaryUseCase}`,
    `Team size: ${auditInput.teamSize}`,
    `Total monthly spend: ${formatCurrency(
      auditResult.totalMonthlySpend
    )}`,
    `Total monthly savings: ${formatCurrency(
      auditResult.totalMonthlySavings
    )}`,
    `Total annual savings: ${formatCurrency(
      auditResult.totalAnnualSavings
    )}`,
    "Tool analysis:",
    ...toolLines,
  ].join("\n");
};

export const generateAISummary = async (
  auditInput: IAuditInput,
  auditResult: IAuditResult
): Promise<string> => {
  const fallbackSummary = buildFallbackSummary(
    auditInput,
    auditResult
  );

  if (!hasGeminiConfig()) {
    return fallbackSummary;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${env.geminiModel}:generateContent?key=${env.geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: buildGeminiPrompt(
                    auditInput,
                    auditResult
                  ),
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 220,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Gemini request failed with status ${response.status}`
      );
    }

    const data =
      (await response.json()) as GeminiResponse;

    const summary = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text?.trim() || "")
      .join(" ")
      .trim();

    return summary || fallbackSummary;
  } catch (error) {
    console.error("Gemini summary generation failed", error);

    return fallbackSummary;
  }
};
