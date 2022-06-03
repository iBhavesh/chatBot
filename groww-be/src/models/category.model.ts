import { Document, model, Schema } from "mongoose";

export interface CategoryDocument extends Document {}

const categorySchema = new Schema<CategoryDocument>({});

export default model("category", categorySchema, "category");
