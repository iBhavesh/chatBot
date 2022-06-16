import axios from "axios";
import { API_URL } from "./utils/constants";

const axiosInstance = axios.create({
  baseURL: API_URL,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosInstance;
