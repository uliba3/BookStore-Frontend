// src/reducers/taskReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { getBooks } from '../services/userBooks';

export const userBooksSlice = createSlice({
  name: 'userBooks',
  initialState: [],
  reducers: {
    setUserBooks: (state, action) => action.payload,
  },
});

export const { setUserBooks } = userBooksSlice.actions;

export const initializeUserBooks = () => async (dispatch) => {
    console.log("initializeUserBooks");
    try {
        const books = await getBooks();
        console.log("books", books);
        dispatch(setUserBooks(books));  // dispatching with the correct payload
    } catch (error) {
        console.error("Error initializing user books", error);
    }
};

export const addBook = (book) => async (dispatch) => {
    const newBooks = await addBook(book);
    dispatch(setUserBooks(newBooks));
};

export default userBooksSlice.reducer;
