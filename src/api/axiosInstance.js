import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://library-manager-api-e409.onrender.com",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
