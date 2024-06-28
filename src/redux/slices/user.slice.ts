import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/types/types";
import RainyDayPark from '@/assets/gifs/kerryParkRainy.gif'
import { UserService } from "@/services/user/user.service";
import { getStoreLocal } from "@/utils/cookies";
import { toastError } from "@/components/UI/Toast/Toast";
import { removeTokensStorage, removeUserStorage } from "@/services/auth/auth.helper";
import { useRouter } from "next/router";

type State = {
  userData: IUser | null;
  status: string,
};

export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async () => {
    const response = await UserService.getProfile(getStoreLocal("user")._id);
    return response.data;
  }
);

const initialState: State = {
  userData: null,
  status: 'idle'
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state: any, action) => {
        state.status = "success";
        state.userData = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.userData = null;
        toastError("Произошла ошибка получения пользователя");
        removeTokensStorage();
        removeUserStorage();
        location.reload();
        state.status = "failed";
      });
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;