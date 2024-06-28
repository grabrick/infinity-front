import { removeTokensStorage } from "@/services/auth/auth.helper";
import { AuthService } from "@/services/auth/auth.service";
import { API_SERVER_URL, API_URL } from "./api.config";
import { errorCatch, getContentType } from "./api.helper";
import { IS_PRODUCTION } from "./api.config";
import axios from "axios";
import Cookies from "js-cookie";

export const axiosClassic = axios.create({
  baseURL: IS_PRODUCTION ? API_SERVER_URL : API_URL,
  headers: getContentType(),
});

export const instance = axios.create({
  baseURL: API_URL,
  headers: getContentType(),
});

instance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("refreshToken");
    if (config.headers && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        await AuthService.getNewTokens();
        return instance(originalRequest);
      } catch (e) {
        removeTokensStorage();
      }
    }

    return Promise.reject(error);
  }
);

export default instance;