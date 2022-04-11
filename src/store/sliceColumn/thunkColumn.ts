import api from '../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IColumn } from '../../types/column';
import { IDesk } from '../../types/desk';
import { columnActions } from './sliceColumn';
import { deskActions } from '../sliceDesk/sliceDesk';
import { AppDispatch } from '../store';

export const fetchAddColumn = createAsyncThunk<
  void,
  {
    deskId: number;
    title: string;
  },
  {
    dispatch: AppDispatch,
  }
  >(
  'column/fetchAddColumn',
  async (data, thunkApi) => {
    try {
      const column: object = {
        deskId: data.deskId,
        title: data.title,
      };
      const response = await api.post<{ message: string; column: IColumn }>('/columns/add', column);
      thunkApi.dispatch(columnActions.setOneColumn(response.data.column));
      thunkApi.dispatch(deskActions.setNewColumnPositionInArray({
        deskId: response.data.column.deskId,
        columnId: response.data.column.id
      }));
    } catch (e: any) {
      alert(e.response?.data);
      return thunkApi.rejectWithValue(e.response?.data);
    }
  }
);

export const fetchEditColumn = createAsyncThunk<
void,
{
  id: number;
  deskId?: number;
  title?: string;
  position?: number;
},
{
  dispatch: AppDispatch,
}
>(
  'column/fetchEditColumn',
  async (data, thunkApi) => {
    try {
      const response = await api.post<{ message: string; column: IColumn }>('/columns/edit', data);
      thunkApi.dispatch(columnActions.setOneColumn(response.data.column));
    } catch (e: any) {
      alert(e.response?.data);
      return thunkApi.rejectWithValue(e.response?.data);
    }
  }
);

export const fetchDeleteColumn = createAsyncThunk<
void,
{
  id: number;
  deskId: number;
},
{
  dispatch: AppDispatch,
}
>(
  'column/fetchDeleteColumn',
  async (data, thunkApi) => {
    try {
      const response = await api.post<{
        message: string;
        deleted: boolean;
        id: number,
        desk: IDesk
      }>('/columns/delete', data);
      if (response.data.deleted) {
        thunkApi.dispatch(columnActions.deleteColumn(response.data.id));
        thunkApi.dispatch(deskActions.setOneDesk(response.data.desk));
      }
    } catch (e: any) {
      alert(e.response?.data);
      return thunkApi.rejectWithValue(e.response?.data);
    }
  }
);

export const fetchUpdateTaskPositions = createAsyncThunk<
void,
{
  columnId: number;
  positions: number[];
},
{
  dispatch: AppDispatch,
}
>(
  'column/fetchUpdateTaskPositions',
  async (data, thunkApi) => {
    try {
      const response = await api.post<{ message: string; column: IColumn }>('/columns/move', data);
      thunkApi.dispatch(columnActions.setOneColumn(response.data.column));
    } catch (e: any) {
      alert(e.response?.data);
      return thunkApi.rejectWithValue(e.response?.data);
    }
  }
);
