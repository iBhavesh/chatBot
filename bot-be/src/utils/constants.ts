export const EVAL_CONDITION = {
  USER_LOGGED_IN: "USER_LOGGED_IN",
  USER_NOT_LOGGED_IN: "USER_NOT_LOGGED_IN",
  KYC_IS_COMPLETE: "KYC_IS_COMPLETE",
  KYC_NOT_COMPLETE: "KYC_NOT_COMPLETE",
} as const;

export const GROWW_URL = process.env.GROWW_URL;
export const DYNAMIC_OPTIONS = {
  "root->stocks->single": [
    "stock.bseScriptCode",
    "stock.nseScriptCode",
    "stock.displayName",
    "stock.low",
    "stock.high",
    "stock.ltp",
  ],
  USER_LOGGED_IN: [
    "user.email_id",
    "user.name",
    "user.mobile",
    "user.user_id",
    "user.kyc_status",
    "user.order_limit",
  ],
};
