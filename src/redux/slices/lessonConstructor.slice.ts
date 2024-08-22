import { createSlice } from "@reduxjs/toolkit";


const initialState: any = {
  issueData: null,
};

const lessonConstructorSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setIssueData: (state, action) => {
      state.issueData = action.payload;
    },
    addedIssue: (state, action) => {
      state.issueData = [...(state.issueData || []), action.payload];
    },
    updateIssueData: (state, action) => {
      const { issueId, newData } = action.payload;
      state.issueData = state.issueData.map((issue: any) =>
        issue.id === issueId ? { ...issue, ...newData } : issue
      );
    },
    deleteSelectedIssue: (state, action) => {
      const issueId = action.payload;
      state.issueData = state.issueData.filter((issue: any) => issue.id !== issueId);
      if (state.issueData.length === 0) {
        state.issueData = null;
      }
    }
  },
});

export const { setIssueData, addedIssue, updateIssueData, deleteSelectedIssue } = lessonConstructorSlice.actions;
export default lessonConstructorSlice.reducer;