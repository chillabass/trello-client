import axios from 'axios';
import { PROTOCOL, SERVER_HOST, SERVER_PORT } from '../../config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IColumn } from '../../types/column';
import { deleteColumn, editColumn, setColumns, setOneColumn } from '../slicers/columnSlicer';

const GENERAL_URL = `${PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/columns`;

const reqConfig = {
  headers: { 
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": GENERAL_URL,
  }
};

export const fetchAddColumn = createAsyncThunk(
  'columns/fetchAddColumn',
  async (data: {deskId: number; title: string;}, { dispatch, rejectWithValue }) => {
    try {
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url: string = `${GENERAL_URL}/add`;
      const column: object = {
        deskId: data.deskId,
        title: data.title,
      };
      const response = await axios.post<{message: string; column: IColumn}>(url, column, reqConfig);
      dispatch(setOneColumn(response.data.column));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchEditColumn = createAsyncThunk(
  'tasks/fetchEditColumn',
  async (data: { id: number; deskId?: number; title?: string; position?: number; }, { dispatch, rejectWithValue }) => {
    try {
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url: string = `${GENERAL_URL}/edit`;
      const response = await axios.post<{message: string; column: IColumn}>(url, data, reqConfig);
      dispatch(editColumn(response.data.column));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchDeleteColumn = createAsyncThunk(
  'tasks/fetchDeleteColumn',
  async (data: {id: number}, { dispatch, rejectWithValue }) => {
    try {
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url: string = `${GENERAL_URL}/delete`;
      const response = await axios.post<{message: string; deleted: boolean; id: number}>(url, data, reqConfig);
      if (response.data.deleted) dispatch(deleteColumn(response.data.id));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchMoveColumn = createAsyncThunk(
  'tasks/fetchMoveColumn',
  async (data: {deskId: number, removedIndex: number, addedIndex: number}, { dispatch, rejectWithValue }) => {
    try {
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url: string = `${GENERAL_URL}/move`;
      const response = await axios.post<{message: string; columns: IColumn[]}>(url, data, reqConfig);
      dispatch(setColumns(response.data.columns));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);