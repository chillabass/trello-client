import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { IDesk } from '../../types/desk';
import { IDeskObject, IDeskState } from './sliceDesk';

export const setOneDesk: CaseReducer<IDeskState, PayloadAction<IDesk>> = (state, action) => {
  state.desks[action.payload.id] = action.payload;
};

export const setDesks: CaseReducer<IDeskState, PayloadAction<IDeskObject>> = (state, action) => ({
  ...state,
  desks: action.payload,
});

export const editDesk: CaseReducer<IDeskState, PayloadAction<IDesk>> = (state, action) => {
  state.desks[action.payload.id] = action.payload;
};

export const deleteDesk: CaseReducer<IDeskState, PayloadAction<number>> = (state, action) => {
  delete state.desks[action.payload];
};

export const resetDesks: CaseReducer<IDeskState> = (state) => ({
  ...state,
  desks: {},
});

export const updateColumnPositions: CaseReducer<IDeskState, PayloadAction<{ id: number; pos: number[] }>> = (state, action) => {
  state.desks[action.payload.id].positions = action.payload.pos;
};

export const setNewColumnPositionInArray: CaseReducer<IDeskState, PayloadAction<{ deskId: number; columnId: number }>> = (state, action) => {
  state.desks[action.payload.deskId].positions.push(action.payload.columnId);
};
