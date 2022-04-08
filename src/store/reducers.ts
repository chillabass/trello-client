import { combineReducers } from '@reduxjs/toolkit';
import { columnReducer } from './sliceColumn/sliceColumn';
import { deskReducer } from './sliceDesk/sliceDesk';
import { taskReducer } from './sliceTask/sliceTask';
import { userReducer } from './sliceUser/sliceUser';

export const rootReducer = combineReducers({
  users: userReducer,
  desks: deskReducer,
  columns: columnReducer,
  tasks: taskReducer,
});
