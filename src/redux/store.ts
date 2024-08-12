import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import folderSlice from "./slices/folder.slice";
import lessonSlice from "./slices/lesson.slice";
import myResultsFoldersSlice from "./slices/myResultsFolders.slice";
import myResultsLessonSlice from "./slices/myResultsLesson.slice";

const rootReducer = combineReducers({
  userSlice,
  folderSlice,
  lessonSlice,
  myResultsFoldersSlice,
  myResultsLessonSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;