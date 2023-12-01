// src/reducers/taskReducer.js
import { createSlice } from '@reduxjs/toolkit';

export const errorMessageSlice = createSlice({
  name: 'errorMessage',
  initialState: "",
  reducers: {
    setErrorMessage: (state, action) => action.payload,
  },
});

export const { setErrorMessage } = errorMessageSlice.actions;

export const makeErrorMessage = (message) => async (dispatch) => {
    console.log("error", message);
    dispatch(setErrorMessage(message));
    setTimeout(() => {
        dispatch(setErrorMessage(""));
    }, 5000);
}

export default errorMessageSlice.reducer;