import mongoose, { Schema, Document } from "mongoose";

export interface ILeadGeneration extends Document {
  name: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  targetRole: string;
  targetLocation: string;
  companySize: string;
  numberOfLeads: number;
  budget: string;
  timeline: string;
  description: string;
  linkedinProfile?: string;
  status: "pending" | "in_progress" | "completed";
  createdAt: Date;
}

const LeadGenerationSchema = new Schema<ILeadGeneration>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    industry: {
      type: String,
      required: [true, "Industry is required"],
      trim: true,
    },
    targetRole: {
      type: String,
      required: [true, "Target role is required"],
      trim: true,
    },
    targetLocation: {
      type: String,
      required: [true, "Target location is required"],
      trim: true,
    },
    companySize: {
      type: String,
      required: [true, "Company size is required"],
      enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
    },
    numberOfLeads: {
      type: Number,
      required: [true, "Number of leads is required"],
      min: 1,
    },
    budget: {
      type: String,
      required: [true, "Budget is required"],
      trim: true,
    },
    timeline: {
      type: String,
      required: [true, "Timeline is required"],
      enum: ["Immediate", "Within 1 week", "Within 2 weeks", "Within 1 month"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    linkedinProfile: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const LeadGeneration =
  mongoose.models.LeadGeneration ||
  mongoose.model<ILeadGeneration>("LeadGeneration", LeadGenerationSchema);

export default LeadGeneration;
