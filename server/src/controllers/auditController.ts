import { Request, Response } from "express";

import Audit from "../models/Audit";

import { runAudit } from "../services/audit/auditEngine";
import { generateAISummary } from "../services/ai/generateSummary";
import { resolveAuditPricing } from "../services/audit/pricing/resolveAuditPricing";

import { generateShareId } from "../utils/generateShareId";

import { validateAuditInput } from "../validators/audit.validator";

export const runAuditController = async (
  req: Request,
  res: Response
) => {
  try {
    const validationError =
      validateAuditInput(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const resolvedInput = {
      ...req.body,
      tools: resolveAuditPricing(req.body.tools),
    };

    const auditResult = runAudit(resolvedInput);

    const shareId = generateShareId();

    const aiSummary = await generateAISummary(
      resolvedInput,
      auditResult
    );

    const auditDocument = await Audit.create({
      shareId,

      teamSize: req.body.teamSize,

      primaryUseCase:
        req.body.primaryUseCase,

      tools: resolvedInput.tools,

      recommendations:
        auditResult.recommendations,

      totals: {
        totalMonthlySpend:
          auditResult.totalMonthlySpend,

        totalMonthlySavings:
          auditResult.totalMonthlySavings,

        totalAnnualSavings:
          auditResult.totalAnnualSavings,
      },

      aiSummary,

      status: "generated",
    });

    return res.status(201).json({
      success: true,

      message:
        "Audit generated successfully.",

      data: auditDocument,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message:
        "Internal server error while generating audit.",
    });
  }
};

export const getAuditByShareIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { shareId } = req.params;

    const audit = await Audit.findOne({
      shareId,
    });

    if (!audit) {
      return res.status(404).json({
        success: false,
        message: "Audit not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: audit,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Internal server error while fetching audit.",
    });
  }
};
