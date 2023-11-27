// src/reducers/taskReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { getBooks, addBook, deleteBook } from '../services/userBooks';
import { isBookIncluded } from '../services/book';

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

export const addNewBook = (book) => async (dispatch, getState) => {
    const userBooks = getState().userBooks;
    if(!isBookIncluded(book, userBooks)) {
      await addBook(book);
      const newBooks = [...userBooks, book];
      dispatch(setUserBooks(newBooks));
    }
};

export const deleteExistingBook = (book) => async (dispatch, getState) => {
  await deleteBook(book);
  const newBooks = getState().userBooks.filter(b => b.bookId !== book.bookId);
  dispatch(setUserBooks(newBooks));
}


export default userBooksSlice.reducer;
