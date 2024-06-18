import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/types/types";
import RainyDayPark from '@/assets/gifs/kerryParkRainy.gif'

type State = {
  userData: IUser | null;
};

const initialState: State = {
  userData: null
};

const optionsSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
});

// export const { setChangeTheme } = optionsSlice.actions;
export default optionsSlice.reducer;