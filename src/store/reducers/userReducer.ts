import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { IUser } from '../../types/user';
import { fetchSignIn, fetchSignUp } from '../asyncActions/userActions';
import { RootState } from '../store';

interface UserState {
  currentUser: object | null;
  token: string;
  isAuth: boolean;
};

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser') || '{}'),
  token: localStorage.getItem('token'),
  isAuth: !!localStorage.getItem('isAuth'),
} as UserState;

export const userSlice: Slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<{ token: string; user: IUser; }>) => {
      const { token, user } = action.payload;
      console.log(user);
      state.currentUser = user;
      state.isAuth = true;
      localStorage.setItem('token', token);
    },
    signout: (state) => {
      state.currentUser = {};
      state.isAuth = false;
      state.token = '';
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuth');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignUp.fulfilled, (state, action: PayloadAction<{ token: string; user: IUser; }>) => {
      const { token, user } = action.payload;
      debugger
      state.currentUser = user;
      state.token = token || '';
      state.isAuth = true;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      localStorage.setItem('token', state.token);
      localStorage.setItem('isAuth', String(state.isAuth));
    });
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      state.currentUser = null;
      state.isAuth = false;
    });

    builder.addCase(fetchSignIn.fulfilled, (state, action: PayloadAction<{ token: string; user: IUser; }>) => {
      const { token, user } = action.payload;
      state.currentUser = user;
      state.token = token || '';
      state.isAuth = true;
      console.log(state.currentUser)
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      localStorage.setItem('token', state.token);
      localStorage.setItem('isAuth', String(state.isAuth));
    });
    builder.addCase(fetchSignIn.rejected, (state, action) => {
      state.currentUser = null;
      state.isAuth = false;
    });
  },
});

export const { auth, signout } = userSlice.actions;

export const getUser = (state: RootState) => state.users.currentUser;
export const getAuth = (state: RootState) => state.users.isAuth;
export const getToken = (state: RootState) => state.users.token;

export default userSlice.reducer;
