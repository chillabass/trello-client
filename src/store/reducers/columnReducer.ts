import { createSlice, Slice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn } from '../../types/column';
import type { RootState } from '../store';

interface ColumnState {
  columns: IColumn[];
};

const initialState = {
  columns: [],
} as ColumnState;

export const columnSlice: Slice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setOneColumn: (state, action: PayloadAction<IColumn>) => {
      state.columns.push(action.payload);
    },
    setColumns: (state, action: PayloadAction<IColumn[]>) => {
      state.columns = action.payload;
    },
    resetColumns: (state) => {
      state.columns = null;
    },
    editColumns: (state, action: PayloadAction<{ id: string; title: string; }>) => {
      const { id, title } = action.payload;
      state.columns.filter((column: { id: string; }) => column.id === id).title = title;
    },
    deleteColumns: (state, action: PayloadAction<{ id: string; }>) => {
      const { id } = action.payload;
      const index = state.columns.findIndex((column: { id: string; }) => column.id === id);
      state.columns.splice(index, 1);
    },    
  },
});

export const { 
  addColumns, 
  editColumns, 
  deleteColumns,
  setColumns,
  setOneColumn,
  resetColumns,
} = columnSlice.actions;

export const getColumns = (state: RootState) => state.columns.columns;

export default columnSlice.reducer;
