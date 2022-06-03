import axios from "axios";
import { GROWW_URL, EVAL_CONDITION } from "./constants";
export const evaluationResult = async (
  conditions: string[],
  user_id: string
) => {
  const user = await axios.get(`${GROWW_URL}/users/${user_id}`);
  for (const condition of conditions) {
    switch (condition) {
      case EVAL_CONDITION.KYC_IS_COMPLETE:
        if (!user.data || user.data.kyc_status !== "complete") return false;
        break;
      case EVAL_CONDITION.KYC_NOT_COMPLETE:
        if (!user.data || user.data.kyc_status === "complete") return false;
        break;
      case EVAL_CONDITION.USER_LOGGED_IN:
        if (!user_id) return false;
        break;
      case EVAL_CONDITION.USER_NOT_LOGGED_IN:
        if (user_id) return false;
        break;
    }
  }
  return true;
};
