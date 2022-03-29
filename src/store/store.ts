import { configureStore } from '@reduxjs/toolkit';
import columnReducer from './slicers/columnSlicer';
import deskReducer from './slicers/deskSlicer';
import taskReducer from './slicers/taskSlicer';
import userReducer from './slicers/userSlicer';

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