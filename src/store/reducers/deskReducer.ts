import { createSlice, Slice } from '@reduxjs/toolkit';

export const deskSlice: Slice = createSlice({
  name: 'desks',
  initialState: {
    desk: {
      columns: {
        tasks: []
      },
    },
  },
  reducers: {
    addColumn: (state, action) => {
      
    },
    editColumn: (state, action) => {
      
    },
    deleteColumn: (state, action) => {
      
    },
    addTask: (state, action) => {
      
    },
    editTask: (state, action) => {
      
    },
    deleteTask: (state, action) => {
      
    },
    
  },
});

export const { 
  addColumn, 
  editColumn, 
  deleteColumn,
  addTask, 
  editTask, 
  deleteTask,
} = deskSlice.actions;

export default deskSlice.reducer;
