import { createSlice } from '@reduxjs/toolkit';
import { ITask } from '../../types/task';
import { deleteTask, moveTask, resetTasks, setOneTask, setTasks } from './actionTask';

export interface ITaskObject {
  [key: string | number]: ITask;
}

export interface ITaskState {
  tasks: ITaskObject;
};

const initialState: ITaskState = {
  tasks: {},
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setOneTask,
    setTasks,
    resetTasks,
    deleteTask,
    moveTask,
  },
});

export const taskActions = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
