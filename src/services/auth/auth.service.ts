import Cookies from "js-cookie";
import { removeTokensStorage, saveToStorage, saveUserDataToStorage } from "./auth.helper";
import instance, { axiosClassic } from "@/api/interceptor";
import { getAuthUrl } from "@/api/api.config";

export const AuthService = {
  async register({email, password, confirmPassword, firstName, lastName}: any) {
    const response = await axiosClassic.post<any>(
      getAuthUrl('/register'),
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }
    );
    if (response.data.accessToken) {
      saveToStorage(response.data);
      saveUserDataToStorage(response.data)
    }
    return response;
  },

  async login({email, password}: any) {
    const response = await axiosClassic.post<any>(
      getAuthUrl('/login'),
      {
        email: email,
        password: password,
      }
    );
    
    if (response.data.accessToken) {
      saveToStorage(response.data);
      saveUserDataToStorage(response.data)
    }
    return response;
  },

  logout() {
    removeTokensStorage();
  },

  // async changeUserRole(id: string, role: string) {
  //   const response = await instance.patch<any>(
  //     `/auth/changeRole/${id}`, 
  //     { 
  //       role: role
  //     }
  //   );
  //   if (response.data) {
  //     // console.log(response.data);
  //     saveUserDataToStorage(response.data)
  //   }
  //   return response;
  // },

  async getNewTokens() {
    const refreshToken = Cookies.get("refreshToken");
    const response = await instance.post<any>(
      "/login/access-token",
      {
        refreshToken,
      },
    );
    if (response.data.accessToken) {
      saveToStorage(response.data);
    }
    return response;
  },
};