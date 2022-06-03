import { Document, model, Schema } from "mongoose";

export interface UserDocument extends Document {
  email_id: string;
  password: string;
  email_verified: boolean;
  name: string;
  mobile: string | null;
  user_id: string;
  kyc_status: string;
  order_limit: number;
}

const userSchema = new Schema<UserDocument>({
  email_id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  kyc_status: {
    type: String,
    default: "NA",
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  mobile: {
    type: Schema.Types.Mixed,
    default: null,
  },
  order_limit: {
    type: Number,
    default: 10,
  },
});

export default model("user", userSchema, "user");
