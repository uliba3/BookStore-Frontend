// src/reducers/taskReducer.js
import { createSlice } from '@reduxjs/toolkit';

export const searchedTermSlice = createSlice({
  name: 'googleBooksIndex',
  initialState: "",
  reducers: {
    setSearchedTerm: (state, action) => action.payload,
  },
});

export const { setSearchedTerm } = searchedTermSlice.actions;

export default searchedTermSlice.reducer;