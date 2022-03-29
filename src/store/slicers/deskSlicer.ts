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
    editDesk: (state, action: PayloadAction<IDesk>) => {
      const updatedDesk = action.payload;
      state.desks.map((column: IDesk) => {
        if (column.id === updatedDesk.id) {
          column.title = updatedDesk.title;
        }
      });
    },
    deleteDesk: (state, action: PayloadAction<{ id: string; }>) => {
      const index = state.desks.findIndex((column: IDesk) => column.id === +action.payload);
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
