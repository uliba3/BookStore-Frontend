// src/reducers/index.js
import { combineReducers } from 'redux';
import googleBooksReducer from './googleBooksReducer';
import googleBooksIndexReducer from './googleBooksIndexReducer';
import searchedTermReducer from './searchedTermReducer';

const rootReducer = combineReducers({
  googleBooks: googleBooksReducer,
  googleBooksIndex: googleBooksIndexReducer,
  searchedTerm: searchedTermReducer,
  // Add other reducers as needed
});

export default rootReducer;