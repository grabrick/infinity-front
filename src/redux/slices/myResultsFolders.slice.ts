import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/types/types";

type State = {
  myResultsFolderData: any | null;
  myResultsChildData: any | null;
  status: string;
};

const initialState: State = {
  myResultsFolderData: null,
  myResultsChildData: null,
  status: "idle",
};

const myResultsFoldersSlice = createSlice({
  name: "myResultsFoldersSlice",
  initialState,
  reducers: {
    setFolderData: (state, action) => {
      state.myResultsFolderData = action.payload;
    },
    setChildFolderData: (state, action) => {
      state.myResultsChildData = action.payload;
    },
    moveRootFolder: (state, action) => {
      const { draggedId, targetId } = action.payload;

      const updatedChildData = state.myResultsFolderData.filter(
        (item: any) => item._id !== draggedId
      );
      state.myResultsFolderData = updatedChildData;
    },
    moveChildFolder: (state, action) => {
      const { draggedId, targetId } = action.payload;

      const updatedChildData = state.myResultsChildData.filter(
        (item: any) => item._id !== draggedId
      );
      state.myResultsChildData = updatedChildData;
    },
    backChildFolder: (state, action) => {
      const { draggedId } = action.payload;

      const updatedChildData = state.myResultsChildData.filter(
        (item: any) => item._id !== draggedId
      )
      state.myResultsChildData = updatedChildData;
    },
  },
});

export const { 
  setFolderData, 
  setChildFolderData, 
  moveChildFolder, 
  backChildFolder,
  moveRootFolder
} = myResultsFoldersSlice.actions;
export default myResultsFoldersSlice.reducer;
