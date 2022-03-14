import { createSlice, Slice } from '@reduxjs/toolkit';
import { fetchSignIn, fetchSignUp } from '../asyncActions/userActions';

export const userSlice: Slice = createSlice({
  name: 'users',
  initialState: {
    currentUser: JSON.parse(localStorage.getItem('currentUser') || '{}'),
    token: localStorage.getItem('token'),
    isAuth: !!localStorage.getItem('isAuth'),
  },
  reducers: {
    auth: (state, action) => {
      const { token, user }: {token: string, user: object} = action.payload;
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
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token || '';
      state.isAuth = true;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      localStorage.setItem('token', state.token);
      localStorage.setItem('isAuth', String(state.isAuth));
    });
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      state.currentUser = {};
      state.isAuth = false;
    });

    builder.addCase(fetchSignIn.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token || '';
      state.isAuth = true;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      localStorage.setItem('token', state.token);
      localStorage.setItem('isAuth', String(state.isAuth));
    });
    builder.addCase(fetchSignIn.rejected, (state, action) => {
      state.currentUser = {};
      state.isAuth = false;
    });
  },
});

export const { auth, signout } = userSlice.actions;

export default userSlice.reducer;
