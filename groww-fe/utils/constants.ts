export const ROUTEMAP = {
  "/stocks": "root->stocks",
  "/stocks/[singleStock]": "root->stocks->single",
  "/mutual-funds": "root->mutual-funds",
  "/fixed-deposits": "root->fixed-deposits",
};

export const API_URL = process.env.API_URL ?? "http://localhost:4000";
export const USER_LOGO =
  "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";
