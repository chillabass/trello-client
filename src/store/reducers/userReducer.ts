import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { IUser, IUserData } from '../../types/user';
import { fetchChangeAvatar, fetchEditProfile, fetchSignIn, fetchSignUp } from '../asyncActions/userActions';
import { RootState } from '../store';

interface UserState {
  currentUser: object | null;
  token: string;
  isAuth: boolean;
};

const initialState = {
  // currentUser: JSON.parse(localStorage.getItem('currentUser') || '{}'),
  currentUser: {},
  // token: '',
  token: localStorage.getItem('token'),
  isAuth: !!localStorage.getItem('isAuth'),
} as UserState;

export const userSlice: Slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signout: (state) => {
      state.currentUser = {};
      state.isAuth = false;
      state.token = '';
      localStorage.removeItem('token');
    },
    setUser: (state, action: PayloadAction<IUserData>) => {
      state.currentUser = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Sign Up
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      state.currentUser = null;
      state.isAuth = false;
    });

    // Sign In
    builder.addCase(fetchSignIn.rejected, (state, action) => {
      state.currentUser = null;
      state.isAuth = false;
    });

    // Edit profile data
    builder.addCase(fetchEditProfile.fulfilled, (state, action: PayloadAction<{ user: IUser; }>) => {
      const { user } = action.payload;
      state.currentUser = user;
      console.log(state.currentUser)
      // localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    });

    // Edit profile avatar
    builder.addCase(fetchChangeAvatar.fulfilled, (state, action: PayloadAction<{ user: IUser; }>) => {
      const { user } = action.payload;
      state.currentUser = user;
      console.log(state.currentUser)
      // localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    });
  },
});

export const { 
  auth,
  signout,
  setUser,
  setToken,
  setIsAuth } = userSlice.actions;

export const getUser = (state: RootState) => state.users.currentUser;
export const getAuth = (state: RootState) => state.users.isAuth;
export const getToken = (state: RootState) => state.users.token;

export default userSlice.reducer;
