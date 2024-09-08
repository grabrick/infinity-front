import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  issueData: null,
};

const lessonConstructorSlice = createSlice({
  name: "lessonConstructor",
  initialState,
  reducers: {
    setIssueData: (state, action) => {
      state.issueData = action.payload;
    },
    addedIssue: (state, action) => {
      const { type, payload } = action.payload;
      if (type === "spinner") {
        state.issueData = [...(state.issueData || []), payload];
      } else if (type === "quiz") {
        // Здесь можно определить логику для добавления других типов
        state.issueData = [...(state.issueData || []), payload];
      }
    },
    updateIssueData: (state, action) => {
      const { issueId, newData, type } = action.payload;
      if (type === "spinner" || type === "quiz") {
        state.issueData = state.issueData.map((issue: any) =>
          issue.id === issueId ? { ...issue, ...newData } : issue
        );
      }
    },
    deleteSelectedIssue: (state, action) => {
      const { issueId, type } = action.payload;
      if (type === "spinner" || type === "quiz") {
        state.issueData = state.issueData.filter((issue: any) => issue.id !== issueId);
      }
      if (state.issueData.length === 0) {
        state.issueData = null;
      }
    }
  },
});

export const { setIssueData, addedIssue, updateIssueData, deleteSelectedIssue } = lessonConstructorSlice.actions;
export default lessonConstructorSlice.reducer;
