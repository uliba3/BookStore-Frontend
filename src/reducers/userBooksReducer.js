// src/reducers/taskReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { getBooks } from '../services/userBooks';
import { is } from 'immer/dist/internal';

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
    if(!isBookAdded(book)) {
      const newBooks = await addBook(book);
      dispatch(setUserBooks(newBooks));
    }
};

export function isBookAdded(state, book) {
    return state.some(b => b.bookId === book.bookId);
}

export default userBooksSlice.reducer;
