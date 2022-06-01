import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    project: {},
  },
  reducers: {
    setProject: (state, action) => {
      state.project = action.payload;
    },
  },
});

export const { setProject } = projectSlice.actions;
export const selectProject = (state) => state.project.project;

export default projectSlice.reducer;
