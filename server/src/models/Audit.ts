import mongoose, { Schema, Document } from "mongoose";

import {
  IResolvedToolInput,
  IRecommendation,
  IAuditTotals,
  UseCase,
} from "../types/audit.types";

export interface IAudit extends Document {
  shareId: string;

  teamSize: number;

  primaryUseCase: UseCase;

  tools: IResolvedToolInput[];

  recommendations: IRecommendation[];

  totals: IAuditTotals;

  aiSummary: string;

  leadCaptured: boolean;

  status: "generated" | "emailed" | "high_savings";

  createdAt: Date;

  updatedAt: Date;
}

const ToolInputSchema = new Schema<IResolvedToolInput>(
  {
    toolName: {
      type: String,
      required: true,
    },

    currentPlan: {
      type: String,
      required: true,
    },

    monthlySpend: {
      type: Number,
      required: true,
      min: 0,
    },

    seats: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const RecommendationSchema = new Schema<IRecommendation>(
  {
    toolName: {
      type: String,
      required: true,
    },

    currentPlan: {
      type: String,
      required: true,
    },

    recommendedPlan: {
      type: String,
    },

    alternativeTool: {
      type: String,
    },

    action: {
      type: String,
      required: true,
    },

    monthlySavings: {
      type: Number,
      required: true,
      min: 0,
    },

    annualSavings: {
      type: Number,
      required: true,
      min: 0,
    },

    confidence: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const AuditTotalsSchema = new Schema<IAuditTotals>(
  {
    totalMonthlySpend: {
      type: Number,
      required: true,
      min: 0,
    },

    totalMonthlySavings: {
      type: Number,
      required: true,
      min: 0,
    },

    totalAnnualSavings: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const AuditSchema = new Schema<IAudit>(
  {
    shareId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    teamSize: {
      type: Number,
      required: true,
      min: 1,
    },

    primaryUseCase: {
      type: String,
      required: true,
    },

    tools: {
      type: [ToolInputSchema],
      required: true,
    },

    recommendations: {
      type: [RecommendationSchema],
      required: true,
    },

    totals: {
      type: AuditTotalsSchema,
      required: true,
    },

    aiSummary: {
      type: String,
      default: "",
    },

    leadCaptured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["generated", "emailed", "high_savings"],
      default: "generated",
    },
  },
  {
    timestamps: true,
  }
);

const Audit = mongoose.model<IAudit>("Audit", AuditSchema);

export default Audit;
