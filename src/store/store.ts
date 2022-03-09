import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReduser';

export default configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: [thunk]
});
