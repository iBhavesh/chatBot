import Axios from "axios";
import { API_URL, BOT_URL } from "./utils/constants";

export const backendInstance = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const botInstance = Axios.create({
  baseURL: BOT_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
