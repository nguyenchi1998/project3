import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    auth: {},
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { setAuth } = userSlice.actions;
export const selectAuth = (state) => state.user.auth;

export default userSlice.reducer;
