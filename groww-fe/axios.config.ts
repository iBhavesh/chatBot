import Axios from "axios";
import { API_URL } from "./utils/constants";

const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axios;
