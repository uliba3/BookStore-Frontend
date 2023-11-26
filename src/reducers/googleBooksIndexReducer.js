// src/reducers/taskReducer.js
import { createSlice } from '@reduxjs/toolkit';

export const googleBooksIndexSlice = createSlice({
  name: 'googleBooksIndex',
  initialState: 0,
  reducers: {
    setGoogleBooksIndex: (state, action) => action.payload,
  },
});

export const { setGoogleBooksIndex } = googleBooksIndexSlice.actions;

export default googleBooksIndexSlice.reducer;