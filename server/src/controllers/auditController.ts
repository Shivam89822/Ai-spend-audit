import { Request, Response } from "express";

import Audit from "../models/Audit";

import { runAudit } from "../services/audit/auditEngine";

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

    const auditResult = runAudit(req.body);

    const shareId = generateShareId();

    const auditDocument = await Audit.create({
      shareId,

      teamSize: req.body.teamSize,

      primaryUseCase:
        req.body.primaryUseCase,

      tools: req.body.tools,

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

      aiSummary:
        "Audit completed successfully.",

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