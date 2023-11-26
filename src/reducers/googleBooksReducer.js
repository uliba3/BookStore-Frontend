// src/reducers/taskReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { search } from '../services/googleBooks';

export const googleBooksSlice = createSlice({
  name: 'googleBooks',
  initialState: [],
  reducers: {
    setGoogleBooks: (state, action) => action.payload,
  },
});

export const { setGoogleBooks } = googleBooksSlice.actions;

export const searchGoogleBooks = (searchTerm) => async (dispatch) => {
    const books = await search(searchTerm, 0);
    dispatch(setGoogleBooks(books));
};

export const changeIndex = (searchTerm, index) => async (dispatch) => {
    const books = await search(searchTerm, index);
    dispatch(setGoogleBooks(books));
};

export default googleBooksSlice.reducer;