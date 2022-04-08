import api from '../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IColumn } from '../../types/column';
import { IDesk } from '../../types/desk';
import { columnActions } from './sliceColumn';
import { deskActions } from '../sliceDesk/sliceDesk';

export const fetchAddColumn = createAsyncThunk(
  'column/fetchAddColumn',
  async (data: { deskId: number; title: string; }, { dispatch, rejectWithValue }) => {
    try {
      const column: object = {
        deskId: data.deskId,
        title: data.title,
      };
      const response = await api.post<{ message: string; column: IColumn }>('/columns/add', column);
      dispatch(columnActions.setOneColumn(response.data.column));
      dispatch(deskActions.setNewColumnPositionInArray({
        deskId: response.data.column.deskId,
        columnId: response.data.column.id
      }));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchEditColumn = createAsyncThunk(
  'column/fetchEditColumn',
  async (data: { id: number; deskId?: number; title?: string; position?: number; }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post<{ message: string; column: IColumn }>('/columns/edit', data);
      dispatch(columnActions.setOneColumn(response.data.column));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchDeleteColumn = createAsyncThunk(
  'column/fetchDeleteColumn',
  async (data: { id: number; deskId: number; }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post<{
        message: string;
        deleted: boolean;
        id: number,
        desk: IDesk
      }>('/columns/delete', data);
      if (response.data.deleted) {
        dispatch(columnActions.deleteColumn(response.data.id));
        dispatch(deskActions.setOneDesk(response.data.desk));
      }
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchUpdateTaskPositions = createAsyncThunk(
  'column/fetchUpdateTaskPositions',
  async (data: { columnId: number, positions: number[] }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post<{ message: string; column: IColumn }>('/columns/move', data);
      dispatch(columnActions.setOneColumn(response.data.column));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);