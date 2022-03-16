import { configureStore } from '@reduxjs/toolkit';
import columnReducer from './reducers/columnReducer';
import deskReducer from './reducers/deskReducer';
import taskReducer from './reducers/taskReducer';
import userReducer from './reducers/userReducer';

export default configureStore({
  reducer: {
    users: userReducer,
    desks: deskReducer,
    columns: columnReducer,
    tasks: taskReducer,
  },
});
