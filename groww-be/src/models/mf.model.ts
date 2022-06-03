import { Document, model, Schema } from "mongoose";

export interface MFDocument extends Document {
  schemeName:string;
}

const mfSchema = new Schema<MFDocument>({
});

export default model("stock", mfSchema, "stock");
