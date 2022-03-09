import { createSlice, Slice } from '@reduxjs/toolkit';

export const userSlice: Slice = createSlice({
  name: 'users',
  initialState: {
    currentUser: {},
  },
  reducers: {
    auth: (state, action) => {
      const { token, user }: {token: string, user: object} = action.payload;
      console.log(user);
      localStorage.setItem('token', token);
      state.currentUser = user;
    },
    signout: (state) => {
      state.currentUser = {};
      localStorage.removeItem('token');
    }
  },
});

export const { auth, signout } = userSlice.actions;

export default userSlice.reducer;
