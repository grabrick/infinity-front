import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/types/types";

type State = {
  myResultsLessonData: any | null;
  myResultsChildData: any | null;
  status: string;
};

const initialState: State = {
  myResultsLessonData: null,
  myResultsChildData: null,
  status: "idle",
};

const myResultsLessonSlice = createSlice({
  name: "myResultsLessonSlice",
  initialState,
  reducers: {
    setLessonData: (state, action) => {
      state.myResultsLessonData = action.payload;
    },
    setChildLessonData: (state, action) => {
      state.myResultsChildData = action.payload;
    },
    moveRootLesson: (state, action) => {
      const { draggedId, targetId } = action.payload;

      const updatedChildData = state.myResultsLessonData.filter(
        (item: any) => item._id !== draggedId
      );
      state.myResultsLessonData = updatedChildData;
    },
    moveChildLesson: (state, action) => {
      const { draggedId, targetId } = action.payload;

      const updatedChildData = state.myResultsChildData.filter(
        (item: any) => item._id !== draggedId
      );
      state.myResultsChildData = updatedChildData;
    },
    backChildLesson: (state, action) => {
      const { draggedId } = action.payload;

      const updatedChildData = state.myResultsChildData.filter(
        (item: any) => item._id !== draggedId
      );
      state.myResultsChildData = updatedChildData;
    },
  },
});

export const {
  setLessonData,
  setChildLessonData,
  moveRootLesson,
  moveChildLesson,
  backChildLesson,
} = myResultsLessonSlice.actions;
export default myResultsLessonSlice.reducer;
