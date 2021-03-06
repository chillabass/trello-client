import { createSlice, Slice, PayloadAction } from '@reduxjs/toolkit';
import { IDesk } from '../../types/desk';
import type { RootState } from '../store';

interface DeskState {
  desks: IDesk[];
};

const initialState = {
  desks: [],
} as DeskState;

export const deskSlice: Slice = createSlice({
  name: 'desk',
  initialState,
  reducers: {
    setDesks: (state, action: PayloadAction<IDesk[]>) => {
      state.desks = action.payload;
    },
    setOneDesk: (state, action: PayloadAction<IDesk>) => {
      state.desks.push(action.payload);
    },
    updateOneDesk: (state, action: PayloadAction<IDesk>) => {
      const index = state.desks.findIndex((desk: IDesk) => desk.id === action.payload.id);
      if (index !== -1) {
        state.desks[index] = action.payload;
      }
    },
    updateColumnPositions: (state, action: PayloadAction<{id: number, pos: number[]}>) => {
      const index = state.desks.findIndex((desks: IDesk) => desks.id === action.payload.id);
      if (index !== -1) {
        state.desks[index].positions = action.payload.pos;
      }
    },
    setNewColumnPositionInArray: (state, action: PayloadAction<{deskId: number, columnId: number}>) => {
      const index = state.desks.findIndex((desks: IDesk) => desks.id === action.payload.deskId);
      if (index !== -1) { 
        state.desks[index].positions.push(action.payload.columnId);
      }
    },
    resetDesks: (state) => {
      state.desks = null;
    },
    editDesk: (state, action: PayloadAction<IDesk>) => {
      const updatedDesk = action.payload;
      state.desks.map((desk: IDesk) => {
        if (desk.id === updatedDesk.id) {
          desk.title = updatedDesk.title;
          desk.positions = updatedDesk.positions;
        }
      });
    },
    deleteDesk: (state, action: PayloadAction<{ id: string; }>) => {
      state.desks = state.desks.filter((column: IDesk) => column.id !== +action.payload);
    },
  },
});

export const {
  addDesk, 
  editDesk, 
  deleteDesk,
  setOneDesk,
  updateOneDesk,
  setDesks,
  updateColumnPositions,
  setNewColumnPositionInArray,
  resetDesks,
} = deskSlice.actions;

export const getDesks = (state: RootState) => state.desks.desks;

export default deskSlice.reducer;
