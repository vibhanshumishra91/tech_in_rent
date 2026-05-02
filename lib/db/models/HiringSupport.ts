import mongoose, { Schema, Document } from "mongoose";

export interface IHiringSupport extends Document {
  name: string;
  email: string;
  company: string;
  phone: string;
  jobTitle: string;
  skills: string;
  experienceLevel: string;
  numberOfPositions: number;
  budget: string;
  timeline: string;
  description: string;
  linkedinProfile?: string;
  status: "pending" | "in_progress" | "completed";
  createdAt: Date;
}

const HiringSupportSchema = new Schema<IHiringSupport>(
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
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    skills: {
      type: String,
      required: [true, "Required skills are required"],
      trim: true,
    },
    experienceLevel: {
      type: String,
      required: [true, "Experience level is required"],
      enum: ["Entry Level", "Mid Level", "Senior Level", "Executive"],
    },
    numberOfPositions: {
      type: Number,
      required: [true, "Number of positions is required"],
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
      enum: ["Immediate", "Within 1 month", "1-3 months", "3+ months"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
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

const HiringSupport =
  mongoose.models.HiringSupport ||
  mongoose.model<IHiringSupport>("HiringSupport", HiringSupportSchema);

export default HiringSupport;
