import mongoose, { Schema, Document } from "mongoose";

interface Tool {
    name: string;
    monthlyCost: number;
    yearlyCost: number;
    category: string;
}

interface AuditResults {
    totalMonthlySpend: number;
    totalYearlySpend: number;
    potentialSavings: number;
    aiSummary: string;
}

export interface AuditDocument extends Document {
    companyName: string;
    industry: string;
    tools: Tool[];
    auditResults: AuditResults;
    createdAt: Date;
}

const ToolSchema = new Schema<Tool>({
    name: {
        type: String,
        required: true
    },
    monthlyCost: {
        type: Number,
        required: true
    },
    yearlyCost: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const AuditResultsSchema = new Schema<AuditResults>({
    totalMonthlySpend: {
        type: Number,
        required: true
    },
    totalYearlySpend: {
        type: Number,
        required: true
    },
    potentialSavings: {
        type: Number,
        required: true
    },
    aiSummary: {
        type: String,
        required: true
    }
});

const AuditSchema = new Schema<AuditDocument>(
    {
        companyName: {
            type: String,
            required: true
        },

        industry: {
            type: String,
            required: true
        },

        tools: {
            type: [ToolSchema],
            required: true
        },

        auditResults: {
            type: AuditResultsSchema,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Audit = mongoose.model<AuditDocument>("Audit", AuditSchema);

export default Audit;