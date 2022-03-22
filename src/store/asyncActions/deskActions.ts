import axios from 'axios';
import { PROTOCOL, SERVER_HOST, SERVER_PORT } from '../../config';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { IUserData } from '../../types/user';
import { IDesk } from '../../types/desk';

const GENERAL_URL = `${PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/desks`;

const reqConfig = {
  headers: { 
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": GENERAL_URL,
  }
};

export const fetchAddDesk = createAsyncThunk<IDesk, string>(
  'desks/fetchAddDesk',
  async (data: string, { rejectWithValue }) => {
    try {
      debugger;
      console.log()
      const url: string = `${GENERAL_URL}/add`;
      const desk: IDesk = {
        id: `d${Date.now()}`,
        title: data,
      };
      const response = await axios.post<IDesk>(url, desk, reqConfig);
      return response.data;
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchEditDesk = createAsyncThunk<IDesk, object>(
  'desks/fetchEditDesk',
  async (data: object, { rejectWithValue }) => {
    try {
      const url: string = `${GENERAL_URL}/edit`;
      const response = await axios.post(url, data, reqConfig);
      return response.data;
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchDeleteDesk = createAsyncThunk<IDesk, object>(
  'desks/fetchDeleteDesk',
  async (data: object, { rejectWithValue }) => {
    try {
      const url: string = `${GENERAL_URL}/delete`;
      const response = await axios.post(url, data, reqConfig);
      return response.data;
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);
