import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://linh-video-back-9nmcd0ad7-kin-afk-ops.vercel.app/api",
});

export default axiosInstance;
