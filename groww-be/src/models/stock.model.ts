import { Document, model, Schema } from "mongoose";

export interface StockDocument extends Document {
  displayName: string;
  low: number;
  high: number;
  ltp: number;
  dayChange:number;
  dayChangePerc:number;
  logoUrl: string;
  marketCap:number;
  pbRatio:number;
  industryPe:number;
  roe:number;
  epsTtm: number;
  bookValue:number;
  yearHighPrice:number;
  yearLowPrice:number;
}

const stockSchema = new Schema<StockDocument>({
  displayName: {
    type: String,
    required: true,
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
  dayChange: {
    type: Number,
    required: true,
  },
  dayChangePerc: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  pbRatio: {
    type: Number,
    required: true,
  },
  industryPe: {
    type: Number,
    required: true,
  },
  roe: {
    type: Number,
    required: true,
  },
  epsTtm: {
    type: Number,
    required: true,
  },
  bookValue: {
    type: Number,
    required: true,
  },
  yearHighPrice: {
    type: Number,
    required: true,
  },
  yearLowPrice: {
    type: Number,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
});

export default model("stock", stockSchema, "stock");
