import { Document, model, Schema } from "mongoose";

export interface StocksOrderDocument extends Document {
  user_id: string;
  stocks_id: string;
  quantity: number;
  price: number;
  total: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

const stocksOrderSchema = new Schema<StocksOrderDocument>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    stocks_id: {
      type: Schema.Types.ObjectId,
      ref: "stocks",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("stocksOrder", stocksOrderSchema, "stocksOrder");
