import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_HOST, SERVER_PORT } from '../../config';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
  },
  reducers: {
    signup: (state, action) => {
      axios.post(`${SERVER_HOST}:${SERVER_PORT}/users/signup`, action.payload).then(response => {
        console.log(response);
      });
    },
  },
});

export const { signup } = userSlice.actions;

export default userSlice.reducer;
