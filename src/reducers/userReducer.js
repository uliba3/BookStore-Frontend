// src/reducers/taskReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { isContentIncluded } from '../services/book';
import userBooksService from '../services/userBooks';
import { resetGoogleBooks } from './googleBooksReducer';
import { makeErrorMessage } from './errorMessageReducer';
import loginService from '../services/login';
import userHistory from '../services/userHistory';
import userWishlist from '../services/userWishlist';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    token: null,
    history: [],
    wishlist: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    setUserBooks: (state, action) => {
        const { history, wishlist } = action.payload;
  
        // Assuming payload has 'history' and 'wishlist' properties,
        // and both are arrays of books
        state.history = history || state.history;
        state.wishlist = wishlist || state.wishlist;
    },
  },
});

export const { setUser, setUserBooks } = userSlice.actions;

export const reset = () => async (dispatch) => {
    dispatch(resetGoogleBooks());
    dispatch(setUser({ username: null, token: null, history: [], wishlist: [] }));
}

export const initializeUserBooks = () => async (dispatch) => {
    console.log("initializeUserBooks");
    try {
        const history = await userHistory.getBooks();
        console.log("books", history);
        const wishlist = await userWishlist.getBooks();
        console.log("books", wishlist);
        dispatch(setUserBooks({history: history, wishlist: wishlist}));  // dispatching with the correct payload
    } catch (error) {
        dispatch(makeErrorMessage("Error loading user books"));
    }
};

export const addNewBook = (book, bookDestination) => async (dispatch, getState) => {
    const userBooks = bookDestination=="history"? getState().user.history : getState().user.wishlist;
    try {
        if (!isContentIncluded(book, userBooks)) {
            bookDestination=="history"? await userHistory.addBook(book): await userWishlist.addBook(book);
            const newBooks = [...userBooks, book];
            bookDestination=="history"? dispatch(setUserBooks({history: newBooks})): dispatch(setUserBooks({wishlist: newBooks}));
        }
    } catch (error) {
        dispatch(makeErrorMessage("Error adding a new book"));
    }
};

export const deleteExistingBook = (book, bookDestination) => async (dispatch, getState) => {
    const userBooks = bookDestination=="history"? getState().user.history : getState().user.wishlist;
    try {
        if (isContentIncluded(book, userBooks)) {
            bookDestination=="history"? await userHistory.deleteBook(book): await userWishlist.deleteBook(book);
            const newContents = userBooks.filter(b => b.bookId !== book.bookId);
            bookDestination=="history"? dispatch(setUserBooks({history: newContents})): dispatch(setUserBooks({wishlist: newContents}));
        }
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
