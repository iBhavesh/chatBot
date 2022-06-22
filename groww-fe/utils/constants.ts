export const ROUTEMAP = {
  "/stocks": "root->stocks",
  "/stocks/[singleStock]": "root->stocks",
  "/mutual-funds": "root->mf",
  "/mutual-funds[singleMF]": "root->mf",
  "/fixed-deposits": "root->fd",
  "/fixed-deposits/[singleFD]": "root->fd",
};

export const API_URL = process.env.API_URL ?? "http://localhost:4000";
export const BOT_URL = process.env.BOT_URL ?? "http://localhost:4001";
export const USER_LOGO =
  "https://cdn-icons-png.flaticon.com/512/1946/1946429.png";
