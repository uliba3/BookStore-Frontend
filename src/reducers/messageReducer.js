// src/reducers/taskReducer.js
import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
  name: 'message',
  initialState: "a",
  reducers: {
    setMessage: (state, action) => action.payload,
  },
});

export const { setMessage } = messageSlice.actions;

export const makeMessage = (message) => async (dispatch) => {
    console.log("message", message);
    dispatch(setMessage(message));
    setTimeout(() => {
        dispatch(setMessage(""));
    }, 5000);
}

export default messageSlice.reducer;