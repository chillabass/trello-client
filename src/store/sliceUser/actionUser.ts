import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/user';
import { IUserState } from './sliceUser';

export const signout: CaseReducer<IUserState> = (state) => {
  localStorage.removeItem('token');
  state.currentUser = null;
  state.isAuth = false;
  state.token = '';
};

export const setUser: CaseReducer<IUserState, PayloadAction<IUser>> = (state, action) => ({
  ...state,
  currentUser: action.payload,
});

export const setToken: CaseReducer<IUserState, PayloadAction<string>> = (state, action) => {
  state.token = action.payload;
  localStorage.setItem('token', action.payload);
};

export const setIsAuth: CaseReducer<IUserState, PayloadAction<boolean>> = (state, action) => ({
  ...state,
  isAuth: action.payload,
});
