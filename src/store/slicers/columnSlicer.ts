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
    editColumn: (state, action: PayloadAction<IColumn>) => {
      const updatedColumn = action.payload;
      state.columns.map((column: IColumn) => {
        if (column.id === updatedColumn.id) {
          column.title = updatedColumn.title;
          column.deskId = updatedColumn.deskId;
          column.position = updatedColumn.position;
        }
      });
    },
    deleteColumn: (state, action: PayloadAction<{ id: number; }>) => {
      const index = state.columns.findIndex((column: IColumn) => column.id === +action.payload);
      state.columns.splice(index, 1);
    },    
  },
});

export const { 
  addColumns, 
  editColumn, 
  deleteColumn,
  setColumns,
  setOneColumn,
  resetColumns,
} = columnSlice.actions;

export const getColumns = (state: RootState) => state.columns.columns;

export default columnSlice.reducer;
