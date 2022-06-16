import { Document, model, Schema, Types } from "mongoose";

export interface CategoryDocument extends Document {
  name: string;
  parent: Types.ObjectId;
  isLeafNode: boolean;
  path: string;
}

const categorySchema = new Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },

    isLeafNode: {
      type: Boolean,
      default: true,
    },
    path: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    id: true,
  }
);

export default model("category", categorySchema, "category");
