import { createSlice, Slice } from '@reduxjs/toolkit';
import { ITask } from '../../types/task';

export const taskSlice: Slice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
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
    editTask: (state, action) => {
      const id = action.payload.id;
      const title = action.payload.title;
      state.tasks.filter((task: { id: string; }) => task.id === id).title = title;
    },
    deleteTask: (state, action) => {
      const id = action.payload.id;
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

export default taskSlice.reducer;
