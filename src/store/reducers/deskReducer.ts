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
    addDesk: (state, action: PayloadAction<{ title: string; }>) => {
      const { title } = action.payload;
      const desk: IDesk = {
        id: `d${Date.now()}`,
        title,
      };
      state.desks.push(desk);
    },
    editDesk: (state, action: PayloadAction<{ id: string; title: string; }>) => {
      const {id, title } = action.payload;
      state.desks.filter((desk: { id: string; }) => desk.id === id).title = title;
    },
    deleteDesk: (state, action: PayloadAction<{ id: string; }>) => {
      const { id } = action.payload;
      const index = state.desks.findIndex((desk: { id: string; }) => desk.id === id);
      state.desks.splice(index, 1);
    },    
  },
});

export const { 
  addDesk, 
  editDesk, 
  deleteDesk,
} = deskSlice.actions;

export const selectDesks = (state: RootState) => state.desks.desks;

export default deskSlice.reducer;
