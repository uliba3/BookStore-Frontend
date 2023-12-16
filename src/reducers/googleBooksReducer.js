// src/reducers/taskReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { search } from '../services/googleBooks';

export const googleBooksSlice = createSlice({
  name: 'googleBooks',
  initialState: {
    books: [],
    index: 0,
    searchedTerm: "",
  },
  reducers: {
    setGoogleBooks: (state, action) => {
      state.books = action.payload;
    },
    setGoogleBooksIndex: (state, action) => {
      state.index = action.payload;
    },
    setSearchedTerm: (state, action) => {
      state.searchedTerm = action.payload;
    },
  },
});

export const { setGoogleBooks, setGoogleBooksIndex, setSearchedTerm } = googleBooksSlice.actions;

export const searchGoogleBooks = (searchTerm) => async (dispatch) => {
    const books = await search(searchTerm, 0);
    dispatch(setSearchedTerm(searchTerm));
    //console.log("searchedTerm: " + searchTerm);
    dispatch(setGoogleBooksIndex(0));
    dispatch(setGoogleBooks(books));
};

export const changeIndex = (index) => async (dispatch, getState) => {
    const searchedTerm = getState().googleBooks.searchedTerm;
    //console.log("searchedTerm: " + searchedTerm);
    const books = await search(searchedTerm, index);
    dispatch(setGoogleBooksIndex(index));
    dispatch(setGoogleBooks(books));
};

export const resetGoogleBooks = () => async (dispatch) => {
    dispatch(setGoogleBooksIndex(0));
    dispatch(setSearchedTerm(""));
    dispatch(setGoogleBooks([]));
};

export default googleBooksSlice.reducer;