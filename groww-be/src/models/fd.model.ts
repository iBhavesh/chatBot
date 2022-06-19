import { Document, model, Schema } from "mongoose";

export interface FDDocument extends Document {
  productName:string;
  maxAmount:number;
  minAmount:number;
  interestRate:number;
  compoundingType:string;
  logoUrl:string;
}

const fdSchema = new Schema<FDDocument>({
  productName: {
    type: String,
    required: true,
  },
  maxAmount: {
    type: Number,
    required: true,
  },
  minAmount: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: String,
    required: true,
  },
  compoundingType: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
});

export default model("fixedDeposit", fdSchema, "fixedDeposit");
