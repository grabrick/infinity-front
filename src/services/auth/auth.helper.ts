import Cookies from "js-cookie";
// import { IAuthResponse, ITokens } from "../../store/user/user.interface";

type TUserData = {
  user: {
    _id: string;
    email: string;
    firstName: string;
    lasttName: string;
    role: string;
  },
  refreshToken: string;
};

export const saveTokensStorage = (data: TUserData) => {
  // Cookies.set("accessToken", data.accessToken);
  // Cookies.set("refreshToken", data.refreshToken);
  Cookies.set(
    "refreshToken",
    data.refreshToken,
    {
      expires: 30,
      // secure: true,
      sameSite: "strict"
    }
  );
};

export const saveToStorage = (data: TUserData) => {
  saveTokensStorage(data);
};

export const saveUserDataToStorage = (data: TUserData) => {
  Cookies.set(
    "user",
    JSON.stringify({
      _id: data.user._id,
      email: data.user.email,
      role: data.user.role,
    }), {
      expires: 30, 
      sameSite: 'strict'
    }
  );
};

export const removeTokensStorage = () => {
  // Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

export const removeUserStorage = () => {
  // Cookies.remove("accessToken");
  Cookies.remove("user");
};

export const logout = () => {
  Cookies.remove("refreshToken");
  Cookies.remove("user");
}