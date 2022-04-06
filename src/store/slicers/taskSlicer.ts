import { createSlice, Slice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../types/task';
import type { RootState } from '../store';

export interface TaskObject {
  [key: string | number]: ITask;
}

interface TaskState {
  tasks: TaskObject;
};

const initialState: TaskState = {
  tasks: {},
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setOneTask: (state, action: PayloadAction<ITask>) => {
      state.tasks[action.payload.id] = action.payload;
    },
    setTasks: (state, action: PayloadAction<ITask[]>) => {
      let tasks: TaskObject = {};
      action.payload.forEach((item: ITask) => {
        tasks[item.id] = item;
      });
      state.tasks = tasks;
    },
    resetTasks: (state) => {
      state.tasks = {};
    },
    editTask: (state, action: PayloadAction<ITask>) => {
      const updatedTask = action.payload;
      state.tasks[updatedTask.id] = updatedTask;
      // state.tasks.map((task: ITask) => {
      //   if (task.id === updatedTask.id) {
      //     task.title = updatedTask.title;
      //     task.description = updatedTask.description;
      //     task.columnId = updatedTask.columnId;
      //     task.position = updatedTask.position;
      //     task.priority = updatedTask.priority;
      //   }
      // });
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      // state.tasks = state.tasks.filter((task: { id: number; }) => task.id !== action.payload);
      delete state.tasks[action.payload];
    },
    moveTask: (state, action: PayloadAction<{ id: number; columnId: number; }>) => {
      // const task = state.tasks.find((task: { id: number; }) => task.id === action.payload.id);
      // task.columnId = action.payload.columnId;
      const task = state.tasks[action.payload.id];
      task.columnId = action.payload.columnId;
    },
  },
});

export const {
  editTask, 
  deleteTask,
  setOneTask,
  setTasks,
  resetTasks,
  moveTask,
} = taskSlice.actions;

export const getTasks = (state: RootState) => state.tasks.tasks;

export default taskSlice.reducer;
