import { createSlice, Slice, PayloadAction } from '@reduxjs/toolkit';
import { IColumn } from '../../types/column';
import type { RootState } from '../store';

export interface ColumnObject {
  [key: string | number]: IColumn;
}

interface ColumnState {
  columns: ColumnObject;
};

const initialState: ColumnState = {
  columns: {},
};

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setOneColumn: (state, action: PayloadAction<IColumn>) => {
      // state.columns.push(action.payload);
      state.columns[action.payload.id] = action.payload;
    },
    updateOneColumn: (state, action: PayloadAction<IColumn>) => {
      // const index = state.columns.findIndex((column: IColumn) => column.id === action.payload.id);
      // if (index !== -1) {
      //   state.columns[index] = action.payload;
      // }
      state.columns[action.payload.id] = action.payload;
    },
    setColumns: (state, action: PayloadAction<IColumn[]>) => {
      let columns: ColumnObject = {};
      action.payload.forEach((item: IColumn) => {
        columns[item.id] = item;
      });
      state.columns = columns;
      // state.columns = action.payload;
    },
    updateTaskPositions: (state, action: PayloadAction<{id: number, pos: number[]}>) => {
      // const index = state.columns.findIndex((column: IColumn) => column.id === action.payload.id);
      // if (index !== -1) {
      //   state.columns[index].positions = action.payload.pos;
      // }
      state.columns[action.payload.id].positions = action.payload.pos;
    },
    setNewTaskPositionInArray: (state, action: PayloadAction<{columnId: number, taskId: number}>) => {
      // const index = state.columns.findIndex((column: IColumn) => column.id === action.payload.columnId);
      // if (index !== -1) {
      //   state.columns[index].positions.push(action.payload.taskId);
      // }
      state.columns[action.payload.columnId].positions.push(action.payload.taskId);
    },
    resetColumns: (state) => {
      state.columns = {};
    },
    editColumn: (state, action: PayloadAction<IColumn>) => {
      const updatedColumn = action.payload;
      state.columns[updatedColumn.id] = updatedColumn;
      // state.columns.map((column: IColumn) => {
      //   if (column.id === updatedColumn.id) {
      //     column.title = updatedColumn.title;
      //     column.deskId = updatedColumn.deskId;
      //     column.positions = updatedColumn.positions;
      //   }
      // });
    },
    deleteColumn: (state, action: PayloadAction<number>) => {
      // state.columns = state.columns.filter((column: IColumn) => column.id !== +action.payload);
      delete state.columns[action.payload];
    },    
  },
});

export const { 
  editColumn, 
  deleteColumn,
  setColumns,
  setOneColumn,
  updateOneColumn,
  updateTaskPositions,
  setNewTaskPositionInArray,
  resetColumns,
} = columnSlice.actions;

export const getColumns = (state: RootState) => state.columns.columns;

export default columnSlice.reducer;
