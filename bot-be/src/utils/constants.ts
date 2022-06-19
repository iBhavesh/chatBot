export const EVAL_CONDITION = {
  USER_LOGGED_IN: "USER_LOGGED_IN",
  USER_NOT_LOGGED_IN: "USER_NOT_LOGGED_IN",
  KYC_IS_COMPLETE: "KYC_IS_COMPLETE",
  KYC_NOT_COMPLETE: "KYC_NOT_COMPLETE",
} as const;

export const GROWW_URL = process.env.GROWW_URL;
export const DYNAMIC_OPTIONS = {
  singleStock: [
    "stock.displayName",
    "stock.low",
    "stock.high",
    "stock.ltp",
    "stock.dayChange",
    "stock.dayChangePerc",
    "stock.marketCap",
    "stock.pbRatio",
    "stock.industryPe",
    "stock.roe",
    "stock.epsTtm",
    "stock.bookValue",
    "stock.yearHighPrice",
    "stock.yearLowPrice",
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

export const UN_DELETE_ABLE = [
  "root",
  "singleStock",
  "singleMF",
  "singleFD",
  "all",
];

export const UN_PARENT_ABLE = ["singleStock", "singleMF", "singleFD", "all"];
