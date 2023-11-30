// src/reducers/index.js
import { combineReducers } from 'redux';
import googleBooksReducer from './googleBooksReducer';
import userReducer from './userReducer';
import errorMessageReducer from './errorMessageReducer';

const rootReducer = combineReducers({
  googleBooks: googleBooksReducer,
  user: userReducer,
  errorMessage: errorMessageReducer,
  // Add other reducers as needed
});

export default rootReducer;