import { Document, model, Schema } from "mongoose";

export interface CategoryDocument extends Document {
  name: string;
  parent: string;
  isLeafNode: boolean;
}

const categorySchema = new Schema<CategoryDocument>({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  isLeafNode: {
    type: Boolean,
    default: true,
  },
},{
  id:true
});

export default model("category", categorySchema, "category");
