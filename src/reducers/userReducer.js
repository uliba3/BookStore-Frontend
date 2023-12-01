// src/reducers/taskReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { getBooks, addBook, deleteBook } from '../services/userBooks';
import { isBookIncluded } from '../services/book';
import userBooksService from '../services/userBooks';
import { resetGoogleBooks } from './googleBooksReducer';
import { makeErrorMessage } from './errorMessageReducer';
import loginService from '../services/login';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    token: null,
    books: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    setUserBooks: (state, action) => {
        state.books = action.payload; // Assuming payload is an array of books
    },
  },
});

export const { setUser, setUserBooks } = userSlice.actions;

export const reset = () => async (dispatch) => {
    dispatch(resetGoogleBooks());
    dispatch(setUser({ username: null, token: null, books: [] }));
}

export const initializeUserBooks = () => async (dispatch) => {
    console.log("initializeUserBooks");
    try {
        const books = await getBooks();
        console.log("books", books);
        dispatch(setUserBooks(books));  // dispatching with the correct payload
    } catch (error) {
        dispatch(makeErrorMessage("Error loading user books"));
    }
};

export const addNewBook = (book) => async (dispatch, getState) => {
    try {
        const userBooks = getState().user.books;
        if (!isBookIncluded(book, userBooks)) {
            await addBook(book);
            const newBooks = [...userBooks, book];
            dispatch(setUserBooks(newBooks));
        }
    } catch (error) {
        dispatch(makeErrorMessage("Error adding a new book"));
    }
};

export const deleteExistingBook = (book) => async (dispatch, getState) => {
    try {
        await deleteBook(book);
        const newBooks = getState().user.books.filter(b => b.bookId !== book.bookId);
        dispatch(setUserBooks(newBooks));
    } catch (error) {
        dispatch(makeErrorMessage("Error deleting the book"));
    }
};

export const loginUser = (username, password) => async (dispatch) => {
    try {
    const user = await loginService.login({
        username, password
        })
    console.log("user", user);
    window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
    userBooksService.setToken(user.token);
    console.log("loginUser", username, user.token);
    dispatch(setUser({ username, token: user.token }));
    dispatch(initializeUserBooks());
    } catch (error) {
        dispatch(makeErrorMessage("Wrong username or password"));
        console.log("error", error);
    }
};

export const logoutUser = () => async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(reset());
}

export const loadUser = () => async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        console.log("loadUser", user);
        dispatch(setUser(user));
        userBooksService.setToken(user.token);
        dispatch(initializeUserBooks());
    }
};

export default userSlice.reducer;
