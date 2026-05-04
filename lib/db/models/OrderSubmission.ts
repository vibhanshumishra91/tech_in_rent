import mongoose, { Document, Schema } from "mongoose";

export interface IOrderSubmission extends Document {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  linkedinUrl: string;
  notes?: string;
  packageId: string;
  packageName: string;
  amountInr: number;
  displayPrice: string;
  delivery: string;
  paymentMethod: string;
  paymentOption: string;
  paymentProofUrl: string;
  paymentProofPublicId?: string;
  status: "pending_verification" | "verified" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const OrderSubmissionSchema = new Schema<IOrderSubmission>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    countryCode: {
      type: String,
      required: [true, "Country code is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    linkedinUrl: {
      type: String,
      required: [true, "LinkedIn URL or ID is required"],
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    packageId: {
      type: String,
      required: [true, "Package ID is required"],
      trim: true,
    },
    packageName: {
      type: String,
      required: [true, "Package name is required"],
      trim: true,
    },
    amountInr: {
      type: Number,
      required: [true, "Amount in INR is required"],
      min: 0,
    },
    displayPrice: {
      type: String,
      required: [true, "Display price is required"],
      trim: true,
    },
    delivery: {
      type: String,
      required: [true, "Delivery timeline is required"],
      trim: true,
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      trim: true,
    },
    paymentOption: {
      type: String,
      required: [true, "Payment option is required"],
      trim: true,
    },
    paymentProofUrl: {
      type: String,
      required: [true, "Payment proof URL is required"],
      trim: true,
    },
    paymentProofPublicId: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending_verification", "verified", "rejected"],
      default: "pending_verification",
    },
  },
  {
    timestamps: true,
  },
);

const OrderSubmission =
  mongoose.models.OrderSubmission ||
  mongoose.model<IOrderSubmission>("OrderSubmission", OrderSubmissionSchema);

export default OrderSubmission;

