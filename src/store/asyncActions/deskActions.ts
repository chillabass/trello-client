import api from '../../services/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDesk } from '../../types/desk';
import { deleteDesk, editDesk, setOneDesk, updateOneDesk } from '../slicers/deskSlicer';

export const fetchAddDesk = createAsyncThunk(
  'desks/fetchAddDesk',
  async (data: string, { dispatch, rejectWithValue }) => {
    try {
      const desk: object = {
        title: data,
      };
      const response = await api.post<{message: string; desk: IDesk}>('/desks/add', desk);
      dispatch(setOneDesk(response.data.desk));
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
      const response = await api.post<{message: string; desk: IDesk}>('/desks/edit', data);
      dispatch(editDesk(response.data.desk));
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
      const response = await api.post<{message: string; deleted: boolean; id: number}>('/desks/delete', data);
      if (response.data.deleted) dispatch(deleteDesk(response.data.id));
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
      const response = await api.get<{desks: IDesk[]}>('/desks/get');
      return response.data.desks;
    } catch (e: any) {
      console.log(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchUpdateColumnPositions = createAsyncThunk(
  'desks/fetchUpdateColumnPositions',
  async (data: {deskId: number, positions: number[]}, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post<{message: string; desk: IDesk}>('/desks/move', data);
      dispatch(updateOneDesk(response.data.desk));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);
