// src/reducers/index.js
import { combineReducers } from 'redux';
import googleBooksReducer from './googleBooksReducer';

const rootReducer = combineReducers({
  googleBooks: googleBooksReducer,
  // Add other reducers as needed
});

export default rootReducer;