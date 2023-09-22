import { BASE_URL } from "./api-endpoints";
import Axios from "axios";

const axiosClient = Axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export default axiosClient;
