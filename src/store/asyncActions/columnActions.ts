import axios from 'axios';
import { PROTOCOL, SERVER_HOST, SERVER_PORT } from '../../config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IColumn } from '../../types/column';
import { setOneColumn } from '../reducers/columnReducer';

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