import { createSlice, Slice } from '@reduxjs/toolkit';
import { IColumn } from '../../types/column';

export const columnSlice: Slice = createSlice({
  name: 'column',
  initialState: {
    columns: [],
  },
  reducers: {
    addColumns: (state, action) => {
      const { deskId, title } = action.payload;
      const column: IColumn = {
        id: `d${Date.now()}`,
        deskId,
        title,
      };
      state.columns.push(column);
    },
    editColumns: (state, action) => {
      const id = action.payload.id;
      const title = action.payload.title;
      state.columns.filter((column: { id: string; }) => column.id === id).title = title;
    },
    deleteColumns: (state, action) => {
      const id = action.payload.id;
      const index = state.columns.findIndex((column: { id: string; }) => column.id === id);
      state.columns.splice(index, 1);
    },    
  },
});

export const { 
  addColumns, 
  editColumns, 
  deleteColumns,
} = columnSlice.actions;

export default columnSlice.reducer;
