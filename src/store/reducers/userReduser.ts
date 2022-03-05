import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PROTOCOL, SERVER_HOST, SERVER_PORT } from '../../config';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    currentUser: {},
  },
  reducers: {
    signup: (state, action) => {
      axios.post(`${PROTOCOL}//${SERVER_HOST}:${SERVER_PORT}/users/signup`, action.payload).then(response => {
        console.log(response);
      });
    },
    signin: (state, action) => {
      axios.post(`${PROTOCOL}//${SERVER_HOST}:${SERVER_PORT}/users/signin`, action.payload).then(response => {
        console.log(response);
      });
    },
  },
});

export const { signup, signin } = userSlice.actions;

export default userSlice.reducer;
