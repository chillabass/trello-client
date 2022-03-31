import { positions } from '@mui/system';
import { createSlice, Slice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../types/task';
import type { RootState } from '../store';

interface TaskState {
  tasks: ITask[];
};

const initialState = {
  tasks: [],
} as TaskState;


export const taskSlice: Slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setOneTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.push(action.payload);
    },
    setTasks: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload;
    },
    resetTasks: (state) => {
      state.tasks = null;
    },
    editTask: (state, action: PayloadAction<ITask>) => {
      const updatedTask = action.payload;
      state.tasks.map((task: ITask) => {
        if (task.id === updatedTask.id) {
          task.title = updatedTask.title;
          task.description = updatedTask.description;
          task.columnId = updatedTask.columnId;
          task.position = updatedTask.position;
          task.priority = updatedTask.priority;
        }
      });
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const index = state.tasks.findIndex((task: { id: number; }) => task.id === action.payload);
      state.tasks.splice(index, 1);
    },
    moveTask: (state, action: PayloadAction<{columnId: number; positions: number[]}>) => {
      
    },
  },
});

export const { 
  addTask, 
  editTask, 
  deleteTask,
  setOneTask,
  setTasks,
  resetTasks,
} = taskSlice.actions;

export const getTasks = (state: RootState) => state.tasks.tasks;

export default taskSlice.reducer;
