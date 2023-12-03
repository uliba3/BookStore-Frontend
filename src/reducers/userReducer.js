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
    setUserContents: (state, action) => {
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

export const initializeUserContents = () => async (dispatch) => {
    console.log("initializeUserBooks");
    try {
        const history = await userHistory.getHistory();
        console.log("books", history);
        const wishlist = await userWishlist.getWishlist();
        console.log("books", wishlist);
        dispatch(setUserContents({history: history, wishlist: wishlist}));  // dispatching with the correct payload
    } catch (error) {
        dispatch(makeErrorMessage("Error loading user books"));
    }
};

export const addNewContent = (book, place) => async (dispatch, getState) => {
    const userContents = place=="history"? getState().user.history : getState().user.wishlist;
    try {
        if (!isContentIncluded(book, userContents)) {
            place=="history"? await userHistory.addBook(book): await userWishlist.addBook(book);
            const newBooks = [...userBooks, book];
            place=="history"? dispatch(setUserContents({history: newBooks})): dispatch(setUserContents({wishlist: newBooks}));
        }
    } catch (error) {
        dispatch(makeErrorMessage("Error adding a new book"));
    }
};

export const deleteExistingBook = (book, place) => async (dispatch, getState) => {
    const userContents = place=="history"? getState().user.history : getState().user.wishlist;
    try {
        if (isContentIncluded(book, userContents)) {
            place=="history"? await userHistory.deleteBook(book): await userWishlist.deleteBook(book);
            const newContents = userContents.filter(b => b.bookId !== book.bookId);
            place=="history"? dispatch(setUserContents({history: newContents})): dispatch(setUserContents({wishlist: newContents}));
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
    dispatch(initializeUserContents());
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
        dispatch(initializeUserContents());
    }
};

export default userSlice.reducer;
