import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReduser';

export default configureStore({
  reducer: {
    users: userReducer,
  },
});
