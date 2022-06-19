import { Document, model, Schema } from "mongoose";

export interface MFDocument extends Document {
  schemeName:string;
  nav:number;
  return3Y:number;
  fundSize:number;
  min_sip_investment:number;
  max_sip_investment:number;
  logoUrl:string;
}

const mfSchema = new Schema<MFDocument>({
  schemeName: {
    type: String,
    required: true,
  },
  nav: {
    type: Number,
    required: true,
  },
  return3Y: {
    type: Number,
    required: true,
  },
  fundSize: {
    type: Number,
    required: true,
  },
  min_sip_investment: {
    type: Number,
    required: true,
  },
  max_sip_investment: {
    type: Number,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
});

export default model("mutualFundund", mfSchema, "mutualFund");
