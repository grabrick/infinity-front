import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/types/types";

type State = {
  folderData: any | null;
  childData: any | null;
  status: string;
};

const initialState: State = {
  folderData: null,
  childData: null,
  status: "idle",
};

const folderSlice = createSlice({
  name: "folderSlice",
  initialState,
  reducers: {
    setFolderData: (state, action) => {
      state.folderData = action.payload;
    },
    setChildFolderData: (state, action) => {
      state.childData = action.payload;
    },
    moveRootFolder: (state, action) => {
      const { draggedId, targetId } = action.payload;

      const updatedChildData = state.folderData.filter(
        (item: any) => item._id !== draggedId
      );
      state.folderData = updatedChildData;
    },
    moveChildFolder: (state, action) => {
      const { draggedId, targetId } = action.payload;

      const updatedChildData = state.childData.filter(
        (item: any) => item._id !== draggedId
      );
      state.childData = updatedChildData;
    },
    backChildFolder: (state, action) => {
      const { draggedId } = action.payload;

      const updatedChildData = state.childData.filter(
        (item: any) => item._id !== draggedId
      )
      state.childData = updatedChildData;
    },
  },
});

export const { 
  setFolderData, 
  setChildFolderData, 
  moveChildFolder, 
  backChildFolder,
  moveRootFolder
} = folderSlice.actions;
export default folderSlice.reducer;
