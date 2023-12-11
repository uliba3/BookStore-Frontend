// src/reducers/index.js
import { combineReducers } from 'redux';
import googleBooksReducer from './googleBooksReducer';
import userReducer from './userReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
  googleBooks: googleBooksReducer,
  user: userReducer,
  message: messageReducer,
  // Add other reducers as needed
});

export default rootReducer;