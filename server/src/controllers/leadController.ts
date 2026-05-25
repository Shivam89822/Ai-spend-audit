import { Request, Response } from "express";

import Audit from "../models/Audit";
import Lead from "../models/Lead";
import { sendAuditEmail } from "../services/email/sendAuditEmail";

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const leads = await Lead.find()
      .sort({ createdAt: -1 })
      .limit(100);

    return res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch leads.",
    });
  }
};

export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      email,
      companyName,
      role,
      teamSize,
      shareId,
      website,
    } = req.body;

    if (website) {
      return res.status(202).json({
        success: true,
        message: "Lead received.",
      });
    }

    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "A valid email is required.",
      });
    }

    if (!shareId) {
      return res.status(400).json({
        success: false,
        message: "Audit share ID is required.",
      });
    }

    const audit = await Audit.findOne({ shareId });

    if (!audit) {
      return res.status(404).json({
        success: false,
        message: "Audit not found.",
      });
    }

    const normalizedEmail = String(email)
      .trim()
      .toLowerCase();

    const existingLead = await Lead.findOne({
      email: normalizedEmail,
      auditId: audit._id,
    });

    const lead =
      existingLead ||
      (await Lead.create({
        email: normalizedEmail,
        companyName:
          companyName?.trim() || undefined,
        role: role?.trim() || undefined,
        teamSize:
          typeof teamSize === "number" && teamSize > 0
            ? teamSize
            : undefined,
        auditId: audit._id,
      }));

    audit.leadCaptured = true;
    audit.status =
      audit.totals.totalMonthlySavings > 500
        ? "high_savings"
        : "emailed";

    await audit.save();

    try {
      await sendAuditEmail(normalizedEmail, audit);
    } catch (error) {
      console.error("Lead email send failed", error);
    }

    return res.status(existingLead ? 200 : 201).json({
      success: true,
      message:
        audit.totals.totalMonthlySavings > 500
          ? "Lead captured. A Credex follow-up can be arranged."
          : "Lead captured. Your audit has been saved.",
      data: {
        id: lead._id,
        email: lead.email,
        leadCaptured: true,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to capture lead.",
    });
  }
};

export const updateLead = async (
  req: Request,
  res: Response
) => {
  return res.status(501).json({
    success: false,
    message: "Lead updates are not implemented.",
  });
};

export const deleteLead = async (
  req: Request,
  res: Response
) => {
  return res.status(501).json({
    success: false,
    message: "Lead deletion is not implemented.",
  });
};
