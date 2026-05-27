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
    console.log("\n--- [LeadController] Incoming Lead Submission ---");
    console.log("Payload received:", req.body);
    const {
      email,
      companyName,
      role,
      teamSize,
      shareId,
      website,
    } = req.body;

    if (website) {
      console.log("⚠️ Honeypot triggered (website field is not empty). Skipping DB save.");
      return res.status(202).json({
        success: true,
        message: "Lead received.",
      });
    }

    if (!email || !emailRegex.test(email)) {
      console.error("❌ Validation failed: Invalid email.");
      return res.status(400).json({
        success: false,
        message: "A valid email is required.",
      });
    }

    if (!shareId) {
      console.error("❌ Validation failed: shareId is missing.");
      return res.status(400).json({
        success: false,
        message: "Audit share ID is required.",
      });
    }

    console.log(`🔍 Looking for Audit with shareId: ${shareId}`);
    const audit = await Audit.findOne({ shareId });

    if (!audit) {
      console.error(`❌ Audit not found for shareId: ${shareId}`);
      return res.status(404).json({
        success: false,
        message: "Audit not found.",
      });
    }

    console.log(`✅ Audit found: ${audit._id}. Checking for existing lead...`);
    const normalizedEmail = String(email)
      .trim()
      .toLowerCase();

    const existingLead = await Lead.findOne({
      email: normalizedEmail,
      auditId: audit._id,
    });

    if (existingLead) console.log("⚠️ Lead already exists for this audit and email.");

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

    if (!existingLead) console.log("✅ New Lead successfully saved to MongoDB:", lead);

    audit.leadCaptured = true;
    audit.status =
      audit.totals.totalMonthlySavings > 500
        ? "high_savings"
        : "emailed";

    console.log("💾 Updating audit status to reflect lead capture...");
    await audit.save();

    try {
      console.log(`📧 Attempting to send audit email to ${normalizedEmail}...`);
      await sendAuditEmail(normalizedEmail, audit);
      console.log("✅ Email sent successfully.");
    } catch (error) {
      console.error("Lead email send failed", error);
    }

    console.log("🚀 Responding to client with success.");
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
    console.error("❌ Fatal error in createLead controller:");
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
