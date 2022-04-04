import axios from 'axios';
import { PROTOCOL, SERVER_HOST, SERVER_PORT } from '../../config';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { IUserData } from '../../types/user';
import { IDesk } from '../../types/desk';
import { deleteDesk, editDesk, setOneDesk, updateOneDesk } from '../slicers/deskSlicer';

const GENERAL_URL = `${PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/desks`;

const reqConfig = {
  headers: { 
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": GENERAL_URL,
  }
};

export const fetchAddDesk = createAsyncThunk(
  'desks/fetchAddDesk',
  async (data: string, { dispatch, rejectWithValue }) => {
    try {
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url: string = `${GENERAL_URL}/add`;
      const desk: object = {
        title: data,
      };
      const response = await axios.post<{message: string; desk: IDesk}>(url, desk, reqConfig);
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
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url: string = `${GENERAL_URL}/edit`;
      const response = await axios.post<{message: string; desk: IDesk}>(url, data, reqConfig);
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
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url: string = `${GENERAL_URL}/delete`;
      const response = await axios.post<{message: string; deleted: boolean; id: number}>(url, data, reqConfig);
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
      const url: string = `${GENERAL_URL}/get`;
      const response = await axios.get<{desks: IDesk[]}>(url, reqConfig);
      console.log(response.data.desks);
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
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url: string = `${GENERAL_URL}/move`;
      const response = await axios.post<{message: string; desk: IDesk}>(url, data, reqConfig);
      dispatch(updateOneDesk(response.data.desk));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);
