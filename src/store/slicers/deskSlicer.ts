import { createSlice, Slice, PayloadAction } from '@reduxjs/toolkit';
import { IDesk } from '../../types/desk';
import type { RootState } from '../store';

export interface DeskObject {
  [key: string | number]: IDesk;
}

interface DeskState {
  desks: DeskObject;
};

const initialState: DeskState = {
  desks: {},
};

export const deskSlice = createSlice({
  name: 'desk',
  initialState,
  reducers: {
    setDesks: (state, action: PayloadAction<IDesk[]>) => {
      // state.desks = action.payload;
      let desks: DeskObject = {};
      action.payload.forEach((item: IDesk) => {
        desks[item.id] = item;
      });
      state.desks = desks;
    },
    setOneDesk: (state, action: PayloadAction<IDesk>) => {
      // state.desks.push(action.payload);
      state.desks[action.payload.id] = action.payload;
    },
    updateOneDesk: (state, action: PayloadAction<IDesk>) => {
      // const index = state.desks.findIndex((desk: IDesk) => desk.id === action.payload.id);
      // if (index !== -1) {
      //   state.desks[index] = action.payload;
      // }
      state.desks[action.payload.id] = action.payload;
    },
    updateColumnPositions: (state, action: PayloadAction<{id: number, pos: number[]}>) => {
      // const index = state.desks.findIndex((desks: IDesk) => desks.id === action.payload.id);
      // if (index !== -1) {
      //   state.desks[index].positions = action.payload.pos;
      // }
      state.desks[action.payload.id].positions = action.payload.pos;
    },
    setNewColumnPositionInArray: (state, action: PayloadAction<{deskId: number, columnId: number}>) => {
      // const index = state.desks.findIndex((desks: IDesk) => desks.id === action.payload.deskId);
      // if (index !== -1) { 
      //   state.desks[index].positions.push(action.payload.columnId);
      // }
      state.desks[action.payload.deskId].positions.push(action.payload.columnId);
    },
    resetDesks: (state) => {
      state.desks = {};
    },
    editDesk: (state, action: PayloadAction<IDesk>) => {
      const updatedDesk = action.payload;
      state.desks[updatedDesk.id] = updatedDesk;
      // state.desks.map((desk: IDesk) => {
      //   if (desk.id === updatedDesk.id) {
      //     desk.title = updatedDesk.title;
      //     desk.positions = updatedDesk.positions;
      //   }
      // });
    },
    deleteDesk: (state, action: PayloadAction<number>) => {
      // state.desks = state.desks.filter((column: IDesk) => column.id !== +action.payload);
      delete state.desks[action.payload];
    },
  },
});

export const {
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
