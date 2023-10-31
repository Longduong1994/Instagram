import { createSlice } from '@reduxjs/toolkit';

const instaSlice = createSlice({
  name: 'instagram',
  initialState: [],
  reducers: {
    post: (state, action) => {
      state.push(action.payload);
    },
    register: (state, action) => {
      state.push(action.payload);
    }
  }
});

export const { post, register } = instaSlice.actions;
export default instaSlice.reducer;
