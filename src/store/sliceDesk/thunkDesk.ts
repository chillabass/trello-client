import api from '../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDesk } from '../../types/desk';
import { deskActions } from './sliceDesk';

export const fetchAddDesk = createAsyncThunk(
  'desks/fetchAddDesk',
  async (data: string, { dispatch, rejectWithValue }) => {
    try {
      const desk: object = {
        title: data,
      };
      const response = await api.post<{ message: string; desk: IDesk }>('/desks/add', desk);
      dispatch(deskActions.setOneDesk(response.data.desk));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchEditDesk = createAsyncThunk(
  'desks/fetchEditDesk',
  async (data: { id: number; title?: string; }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post<{ message: string; desk: IDesk }>('/desks/edit', data);
      dispatch(deskActions.setOneDesk(response.data.desk));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchDeleteDesk = createAsyncThunk(
  'desks/fetchDeleteDesk',
  async (data: { id: number; }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post<{ message: string; deleted: boolean; id: number }>('/desks/delete', data);
      if (response.data.deleted) dispatch(deskActions.deleteDesk(response.data.id));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchGetDesk = createAsyncThunk(
  'desks/fetchGetDesk',
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await api.get<{ desks: IDesk[] }>('/desks/get');
      return response.data.desks;
    } catch (e: any) {
      console.log(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchUpdateColumnPositions = createAsyncThunk(
  'desks/fetchUpdateColumnPositions',
  async (data: { deskId: number, positions: number[] }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post<{ message: string; desk: IDesk }>('/desks/move', data);
      dispatch(deskActions.setOneDesk(response.data.desk));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);
