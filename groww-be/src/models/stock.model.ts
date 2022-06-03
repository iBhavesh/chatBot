import { Document, model, Schema } from "mongoose";

export interface StockDocument extends Document {
  bseScriptCode: string;
  nseScriptCode: string;
  displayName: string;
  searchId: string;
  low: number;
  high: number;
  ltp: number;
  logoUrl: string;
}

const stockSchema = new Schema<StockDocument>({
  bseScriptCode: {
    type: String,
    required: true,
    unique: true,
  },
  nseScriptCode: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  searchId: {
    type: String,
    required: true,
    unique: true,
  },
  low: {
    type: Number,
    required: true,
  },
  high: {
    type: Number,
    required: true,
  },
  ltp: {
    type: Number,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
});

export default model("stock", stockSchema, "stock");
