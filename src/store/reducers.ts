import { combineReducers } from '@reduxjs/toolkit';
import columnReducer from './slicers/columnSlicer';
import deskReducer from './slicers/deskSlicer';
import taskReducer from './slicers/taskSlicer';
import userReducer from './slicers/userSlicer';

export const rootReducer = combineReducers({
  users: userReducer,
  desks: deskReducer,
  columns: columnReducer,
  tasks: taskReducer,
});
