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
    addTask: (state, action: PayloadAction<{ columnId: string; title: string; }>) => {
      const { columnId, title } = action.payload;
      const task: ITask = {
        id: `t${Date.now()}`,
        columnId,
        title,
        position: state.tasks.length,
        priority: 1,
      };
      state.tasks.push(task);
    },
    editTask: (state, action: PayloadAction<{ id: string; title: string; }>) => {
      const {id, title} = action.payload;
      state.tasks.filter((task: { id: string; }) => task.id === id).title = title;
    },
    deleteTask: (state, action: PayloadAction<{ id: string; }>) => {
      const { id } = action.payload;
      const index = state.tasks.findIndex((task: { id: string; }) => task.id === id);
      state.tasks.splice(index, 1);
    },
  },
});

export const { 
  addTask, 
  editTask, 
  deleteTask,
} = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;

export default taskSlice.reducer;
