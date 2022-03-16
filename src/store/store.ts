import { configureStore } from '@reduxjs/toolkit';
import columnReducer from './reducers/columnReducer';
import deskReducer from './reducers/deskReducer';
import taskReducer from './reducers/taskReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    users: userReducer,
    desks: deskReducer,
    columns: columnReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;