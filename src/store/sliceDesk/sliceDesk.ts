import { createSlice } from '@reduxjs/toolkit';
import { IDesk } from '../../types/desk';
import { deleteDesk, editDesk, resetDesks, setDesks, setNewColumnPositionInArray, setOneDesk, updateColumnPositions } from './actionDesk';

export interface IDeskObject {
  [key: string | number]: IDesk;
}

export interface IDeskState {
  desks: IDeskObject;
};

const initialState: IDeskState = {
  desks: {},
};

export const deskSlice = createSlice({
  name: 'desk',
  initialState,
  reducers: {
    setOneDesk,
    setDesks,
    editDesk,
    deleteDesk,
    resetDesks,
    updateColumnPositions,
    setNewColumnPositionInArray,
  },
});

export const deskActions = deskSlice.actions;
export const deskReducer = deskSlice.reducer;
