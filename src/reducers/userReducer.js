// src/reducers/taskReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { isBookIncluded } from '../services/book';
import { resetGoogleBooks } from './googleBooksReducer';
import { makeMessage } from './messageReducer';
import loginService from '../services/login';
import userHistory from '../services/userHistory';
import userWishlist from '../services/userWishlist';
import { deleteUser } from '../services/users';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    token: null,
    history: [],
    wishlist: [],
    id: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.id = action.payload.id;
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
    window.localStorage.removeItem('loggedUser');
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
        console.log("error", error);
        dispatch(makeMessage("Error loading user books"));
        dispatch(logoutUser());
    }
};

export const addNewBook = (book, bookDestination) => async (dispatch, getState) => {
    const userBooks = bookDestination=="history"? getState().user.history : getState().user.wishlist;
    try {
        if (!isBookIncluded(book, userBooks)) {
            bookDestination=="history"? await userHistory.addBook(book): await userWishlist.addBook(book);
            const newBooks = [...userBooks, book];
            bookDestination=="history"? dispatch(setUserBooks({history: newBooks})): dispatch(setUserBooks({wishlist: newBooks}));
            dispatch(makeMessage("Book added to the " + bookDestination));
        }
    } catch (error) {
        dispatch(makeMessage("Error adding a new book"));
    }
};

export const deleteExistingBook = (book, bookDestination) => async (dispatch, getState) => {
    const userBooks = bookDestination=="history"? getState().user.history : getState().user.wishlist;
    try {
        if (isBookIncluded(book, userBooks)) {
            bookDestination=="history"? await userHistory.deleteBook(book): await userWishlist.deleteBook(book);
            const newContents = userBooks.filter(b => b.bookId !== book.bookId);
            bookDestination=="history"? dispatch(setUserBooks({history: newContents})): dispatch(setUserBooks({wishlist: newContents}));
        }
    } catch (error) {
        dispatch(makeMessage("Error deleting the book"));
    }
};

export const loginUser = (username, password) => async (dispatch) => {
    try {
    const user = await loginService.login({
        username, password
    })
    console.log("user", user);
    window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
    )
    userHistory.setToken(user.token);
    userWishlist.setToken(user.token);
    console.log("loginUser", username, user.token);
    dispatch(setUser({ username, token: user.token, id: user.id }));
    dispatch(initializeUserBooks());
    dispatch(makeMessage('Logged in'));
    } catch (error) {
        dispatch(makeMessage("Wrong username or password"));
        console.log("error", error);
    }
};

export const logoutUser = () => async (dispatch) => {
    dispatch(reset());
    dispatch(makeMessage("Logged out"));
}

export const loadUser = () => async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    console.log("loadUser", loggedUserJSON);
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        console.log("loadUser", user);
        dispatch(setUser(user));
        userHistory.setToken(user.token);
        userWishlist.setToken(user.token);
        dispatch(initializeUserBooks());
    }
};

export const deleteExistingUser = () => async (dispatch, getState) => {
    try {
        await deleteUser(getState().user);
        dispatch(makeMessage("User deleted"));
        dispatch(reset());
    } catch (error) {
        console.log("error", error);
        dispatch(makeMessage("Error deleting the user"));
    }
}

export default userSlice.reducer;
