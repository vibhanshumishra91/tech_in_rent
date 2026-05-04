import mongoose, { Document, Schema } from "mongoose";

export interface IPaymentOption {
  optionId: string;
  label: string;
  paymentAddressLabel: string;
  paymentAddressValue: string;
  qrImageUrl?: string;
  instructions: string[];
  isActive: boolean;
}

export interface IPaymentMethod extends Document {
  name: string;
  isActive: boolean;
  options: IPaymentOption[];
  createdAt: Date;
  updatedAt: Date;
}

const PaymentOptionSchema = new Schema<IPaymentOption>(
  {
    optionId: {
      type: String,
      required: [true, "Option ID is required"],
      trim: true,
    },
    label: {
      type: String,
      required: [true, "Option label is required"],
      trim: true,
    },
    paymentAddressLabel: {
      type: String,
      required: [true, "Payment address label is required"],
      trim: true,
    },
    paymentAddressValue: {
      type: String,
      required: [true, "Payment address value is required"],
      trim: true,
    },
    qrImageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    instructions: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);

const PaymentMethodSchema = new Schema<IPaymentMethod>(
  {
    name: {
      type: String,
      required: [true, "Method name is required"],
      trim: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    options: {
      type: [PaymentOptionSchema],
      default: [],
      validate: {
        validator: (items: IPaymentOption[]) => items.length > 0,
        message: "At least one payment option is required",
      },
    },
  },
  { timestamps: true },
);

const PaymentMethod =
  mongoose.models.PaymentMethod ||
  mongoose.model<IPaymentMethod>("PaymentMethod", PaymentMethodSchema);

export default PaymentMethod;

