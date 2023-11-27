// src/reducers/index.js
import { combineReducers } from 'redux';
import googleBooksReducer from './googleBooksReducer';
import googleBooksIndexReducer from './googleBooksIndexReducer';
import searchedTermReducer from './searchedTermReducer';
import userBooksReducer from './userBooksReducer';

const rootReducer = combineReducers({
  googleBooks: googleBooksReducer,
  googleBooksIndex: googleBooksIndexReducer,
  searchedTerm: searchedTermReducer,
  userBooks: userBooksReducer,
  // Add other reducers as needed
});

export default rootReducer;