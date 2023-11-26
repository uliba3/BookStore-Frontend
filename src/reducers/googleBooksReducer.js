// src/reducers/taskReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { search } from '../services/googleBooks';
import { setGoogleBooksIndex } from './googleBooksIndexReducer';
import { setSearchedTerm } from './searchedTermReducer';

export const googleBooksSlice = createSlice({
  name: 'googleBooks',
  initialState: [],
  reducers: {
    setGoogleBooks: (state, action) => action.payload,
  },
});

export const { setGoogleBooks } = googleBooksSlice.actions;

export const searchGoogleBooks = (searchTerm) => async (dispatch, getState) => {
    const books = await search(searchTerm, 0);
    dispatch(setSearchedTerm(searchTerm));
    const searchedTerm = getState().searchedTerm;
    console.log("searchedTerm: " + searchedTerm);
    dispatch(setGoogleBooksIndex(0));
    dispatch(setGoogleBooks(books));
};

export const changeIndex = (index) => async (dispatch, getState) => {
    const searchedTerm = getState().searchedTerm;
    console.log("searchedTerm: " + searchedTerm);
    const books = await search(searchedTerm, index);
    dispatch(setGoogleBooksIndex(index));
    dispatch(setGoogleBooks(books));
};

export default googleBooksSlice.reducer;