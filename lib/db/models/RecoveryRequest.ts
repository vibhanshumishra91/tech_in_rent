import mongoose, { Schema, Document } from "mongoose";

export interface IRecoveryRequest extends Document {
  name: string;
  email: string;
  linkedinUrl: string;
  issueType: string;
  description: string;
  status: "pending" | "in_progress" | "resolved";
  createdAt: Date;
}

const RecoveryRequestSchema = new Schema<IRecoveryRequest>(
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
    linkedinUrl: {
      type: String,
      required: [true, "LinkedIn URL is required"],
      trim: true,
    },
    issueType: {
      type: String,
      required: [true, "Issue type is required"],
      enum: [
        "Account Restricted",
        "Unusual Activity Warning",
        "Identity Verification",
        "Connection Limit",
        "Content Policy Violation",
        "Other",
      ],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "resolved"],
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

const RecoveryRequest =
  mongoose.models.RecoveryRequest ||
  mongoose.model<IRecoveryRequest>("RecoveryRequest", RecoveryRequestSchema);

export default RecoveryRequest;
