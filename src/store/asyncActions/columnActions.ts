import api, { socket } from '../../services/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IColumn } from '../../types/column';
import { deleteColumn, editColumn, setColumns, setOneColumn, updateOneColumn } from '../slicers/columnSlicer';
import { setNewColumnPositionInArray, updateOneDesk } from '../slicers/deskSlicer';
import { AppDispatch, RootState } from '../store';


export const fetchAddColumn = createAsyncThunk(
  'column/fetchAddColumn',
  async (data: { deskId: number; title: string; }, { dispatch, rejectWithValue }) => {
    try {
      const column: object = {
        deskId: data.deskId,
        title: data.title,
      };
      const response = await api.post<{ message: string; column: IColumn }>('/columns/add', column);
      dispatch(setOneColumn(response.data.column));
      dispatch(setNewColumnPositionInArray({
        deskId: response.data.column.deskId,
        columnId: response.data.column.id
      }));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

socket.on('column:add', (data: { message: string; column: IColumn; }) => {
  // dispatch(setOneColumn(response.data.column));
  // dispatch(setNewColumnPositionInArray({deskId: response.data.column.deskId, columnId: response.data.column.id}));
});

export const socketAddColumn = createAsyncThunk<
string,
{ deskId: number; title: string; },
{
  dispatch: AppDispatch,
  store: RootState
}
>(
  'column/socketAddColumn',
  async (data, thunkApi) => {
    try {
      socket.emit('column:add', data);
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
      dispatch(editColumn(response.data.column));
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
      const response = await api.post<{ message: string; deleted: boolean; id: number, desk: { positions: number[] } }>('/columns/delete', data);
      if (response.data.deleted) {
        dispatch(deleteColumn(response.data.id));
        dispatch(updateOneDesk(response.data.desk));
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
      dispatch(updateOneColumn(response.data.column));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);