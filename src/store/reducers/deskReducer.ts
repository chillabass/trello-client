import { createSlice, Slice } from '@reduxjs/toolkit';
import { IDesk } from '../../types/desk';

export const deskSlice: Slice = createSlice({
  name: 'desk',
  initialState: {
    desks: [],
  },
  reducers: {
    addDesk: (state, action) => {
      const { title } = action.payload;
      const desk: IDesk = {
        id: `d${Date.now()}`,
        title,
      };
      state.desks.push(desk);
    },
    editDesk: (state, action) => {
      const id = action.payload.id;
      const title = action.payload.title;
      state.desks.filter((desk: { id: string; }) => desk.id === id).title = title;
    },
    deleteDesk: (state, action) => {
      const id = action.payload.id;
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

export default deskSlice.reducer;
