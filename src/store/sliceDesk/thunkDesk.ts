import api from '../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDesk } from '../../types/desk';
import { deskActions } from './sliceDesk';
import { AppDispatch } from '../store';

export const fetchAddDesk = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch,
  }
>(
  'desks/fetchAddDesk',
  async (data, thunkApi) => {
    try {
      const desk: object = {
        title: data,
      };
      const response = await api.post<{ message: string; desk: IDesk }>('/desks/add', desk);
      thunkApi.dispatch(deskActions.setOneDesk(response.data.desk));
    } catch (e: any) {
      alert(e.response?.data);
      return thunkApi.rejectWithValue(e.response?.data);
    }
  }
);

export const fetchEditDesk = createAsyncThunk<
  void,
  {
    id: number;
    title?: string;
  },
  {
    dispatch: AppDispatch,
  }
>(
  'desks/fetchEditDesk',
  async (data, thunkApi) => {
    try {
      const response = await api.post<{ message: string; desk: IDesk }>('/desks/edit', data);
      thunkApi.dispatch(deskActions.setOneDesk(response.data.desk));
    } catch (e: any) {
      alert(e.response?.data);
      return thunkApi.rejectWithValue(e.response?.data);
    }
  }
);

export const fetchDeleteDesk = createAsyncThunk<
  void,
  {
    id: number;
  },
  {
    dispatch: AppDispatch,
  }
>(
  'desks/fetchDeleteDesk',
  async (data, thunkApi) => {
    try {
      const response = await api.post<{ message: string; deleted: boolean; id: number }>('/desks/delete', data);
      if (response.data.deleted) {
        thunkApi.dispatch(deskActions.deleteDesk(response.data.id));
      }
    } catch (e: any) {
      alert(e.response?.data);
      return thunkApi.rejectWithValue(e.response?.data);
    }
  }
);

export const fetchUpdateColumnPositions = createAsyncThunk<
  void,
  {
    deskId: number;
    positions: number[];
  },
  {
    dispatch: AppDispatch,
  }
>(
  'desks/fetchUpdateColumnPositions',
  async (data, thunkApi) => {
    try {
      const response = await api.post<{ message: string; desk: IDesk }>('/desks/move', data);
      thunkApi.dispatch(deskActions.setOneDesk(response.data.desk));
    } catch (e: any) {
      alert(e.response?.data);
      return thunkApi.rejectWithValue(e.response?.data);
    }
  }
);
