import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { IColumn } from '../../types/column';
import { IColumnObject, IColumnState } from './sliceColumn';

export const setOneColumn: CaseReducer<IColumnState, PayloadAction<IColumn>> = (state, action) => {
  state.columns[action.payload.id] = action.payload;
};

export const updateOneColumn: CaseReducer<IColumnState, PayloadAction<IColumn>> = (state, action) => {
  state.columns[action.payload.id] = action.payload;
};

export const setColumns: CaseReducer<IColumnState, PayloadAction<IColumnObject>> = (state, action) => ({
  ...state,
  columns: action.payload,
});

export const updateTaskPositions: CaseReducer<IColumnState, PayloadAction<{ id: number; pos: number[] }>> = (state, action) => {
  state.columns[action.payload.id].positions = action.payload.pos;
};

export const setNewTaskPositionInArray: CaseReducer<IColumnState, PayloadAction<{ columnId: number; taskId: number }>> = (state, action) => {
  state.columns[action.payload.columnId].positions.push(action.payload.taskId);
};

export const resetColumns: CaseReducer<IColumnState> = (state) => ({
  ...state,
  columns: {},
});

export const deleteColumn: CaseReducer<IColumnState, PayloadAction<number>> = (state, action) => {
  delete state.columns[action.payload];
};
