import { createSlice } from '@reduxjs/toolkit';
import {
  setIsAuth,
  setToken,
  setUser,
  signout
} from './actionUser';

import { IUser } from '../../types/user';

export interface IUserState {
  currentUser: IUser | null;
  token: string | null;
  isAuth: boolean;
};

const initialState: IUserState = {
  currentUser: null,
  token: localStorage.getItem('token'),
  isAuth: !!localStorage.getItem('isAuth'),
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser,
    setToken,
    setIsAuth,
    signout,
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
