import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPartner extends Document {
  name: string;
  logo: string;
  website?: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const PartnerSchema = new Schema<IPartner>(
  {
    name: {
      type: String,
      required: [true, "Partner name is required"],
      trim: true,
      maxlength: [100, "Partner name cannot exceed 100 characters"],
    },
    logo: {
      type: String,
      required: [true, "Partner logo is required"],
      trim: true,
    },
    website: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message: "Status must be either active or inactive",
      },
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Index for filtering by status
PartnerSchema.index({ status: 1 });

// Index for sorting by creation date
PartnerSchema.index({ createdAt: -1 });

// Mongoose model reuse pattern for Next.js hot reload
const Partner: Model<IPartner> =
  mongoose.models.Partner || mongoose.model<IPartner>("Partner", PartnerSchema);

export default Partner;
