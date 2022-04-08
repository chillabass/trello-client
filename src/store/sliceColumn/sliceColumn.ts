import { createSlice } from '@reduxjs/toolkit';
import { IColumn } from '../../types/column';
import {
  deleteColumn,
  resetColumns,
  setColumns,
  setNewTaskPositionInArray,
  setOneColumn,
  updateTaskPositions
} from './actionColumn';

export interface IColumnObject {
  [key: string | number]: IColumn;
}

export interface IColumnState {
  columns: IColumnObject;
};

const initialState: IColumnState = {
  columns: {},
};

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setOneColumn,
    setColumns,
    updateTaskPositions,
    setNewTaskPositionInArray,
    resetColumns,
    deleteColumn,
  },
});

export const columnActions = columnSlice.actions;
export const columnReducer = columnSlice.reducer;
