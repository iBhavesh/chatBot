import { Document, model, Schema, Types } from "mongoose";

export interface QuestionDocument extends Document {
  categoryId: string;
  question: string;
  answer: string;
  isDynamic: boolean;
  frequency: number;
  evalCondition: Types.Array<string>;
}

const questionSchema = new Schema<QuestionDocument>({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  isDynamic: {
    type: Boolean,
    required: true,
  },
  frequency: {
    type: Number,
    select: false,
    default: 0,
  },
  evalCondition: {
    type: [String],
    select: false,
    default: "",
  },
});

export default model("questions", questionSchema, "questions");
