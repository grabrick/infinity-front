import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/types/types";

type State = {
  lessonData: any | null;
  childData: any | null;
  status: string;
};

const initialState: State = {
  lessonData: null,
  childData: null,
  status: "idle",
};

const lessonSlice = createSlice({
  name: "folderSlice",
  initialState,
  reducers: {
    setLessonData: (state, action) => {
      state.lessonData = action.payload;
    },
    setChildLessonData: (state, action) => {
      state.childData = action.payload;
    },
    moveRootLesson: (state, action) => {
      const { draggedId, targetId } = action.payload;

      const updatedChildData = state.lessonData.filter(
        (item: any) => item._id !== draggedId
      );
      state.lessonData = updatedChildData;
    },
    moveChildLesson: (state, action) => {
      const { draggedId, targetId } = action.payload;

      const updatedChildData = state.childData.filter(
        (item: any) => item._id !== draggedId
      );
      state.childData = updatedChildData;
    },
    backChildLesson: (state, action) => {
      const { draggedId } = action.payload;

      const updatedChildData = state.childData.filter(
        (item: any) => item._id !== draggedId
      );
      state.childData = updatedChildData;
    },
  },
});

export const {
  setLessonData,
  setChildLessonData,
  moveRootLesson,
  moveChildLesson,
  backChildLesson,
} = lessonSlice.actions;
export default lessonSlice.reducer;
