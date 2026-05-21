import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
  email: string;

  companyName?: string;

  role?: string;

  teamSize?: number;

  auditId: mongoose.Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    companyName: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      trim: true,
    },

    teamSize: {
      type: Number,
      min: 1,
    },

    auditId: {
      type: Schema.Types.ObjectId,
      ref: "Audit",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;