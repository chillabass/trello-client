import { createSlice, Slice, PayloadAction } from '@reduxjs/toolkit';
import { IDesk } from '../../types/desk';
import { fetchAddDesk } from '../asyncActions/deskActions';
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
    // addDesk: (state, action: PayloadAction<string>) => {
    //   const desk: IDesk = {
    //     id: `d${Date.now()}`,
    //     title: action.payload,
    //   };

    //   state.desks.push(desk);
    // },
    setDesks: (state, action: PayloadAction<IDesk[]>) => {
      state.desks = action.payload;
    },
    setOneDesk: (state, action: PayloadAction<IDesk>) => {
      state.desks.push(action.payload);
    },
    resetDesks: (state) => {
      state.desks = null;
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
  // extraReducers: (builder) => {
  //   // Add desk
  //   builder.addCase(fetchAddDesk.fulfilled, (state, action: PayloadAction<IDesk>) => {
  //     state.desks.push(action.payload);      
  //   });
  //   // Get desk
  //   builder.addCase(fetchGetDesk.fulfilled, (state, action: any) => {
  //     // state.desks.push(action.payload);
  //   })
  // }
});

export const {
  addDesk, 
  editDesk, 
  deleteDesk,
  setOneDesk,
  setDesks,
  resetDesks,
} = deskSlice.actions;

export const getDesks = (state: RootState) => state.desks.desks;

export default deskSlice.reducer;
