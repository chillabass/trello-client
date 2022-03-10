import { createSlice, Slice } from '@reduxjs/toolkit';

export const userSlice: Slice = createSlice({
  name: 'users',
  initialState: {
    currentUser: {},
    isAuth: localStorage.getItem('isAuth'),
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
      localStorage.removeItem('token');
    }
  },
});

export const { auth, signout } = userSlice.actions;

export default userSlice.reducer;
