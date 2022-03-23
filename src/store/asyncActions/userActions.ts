import axios from 'axios';
import { PROTOCOL, SERVER_HOST, SERVER_PORT } from '../../config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserData } from '../../types/user';
import { IEditData } from '../../types/editProfile';

const GENERAL_URL = `${PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/users`;

const reqConfig = {
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": GENERAL_URL,
  }
};

export const fetchSignUp = createAsyncThunk<IUserData, object>(
  'users/fetchSignUp',
  async (data: object, { rejectWithValue }) => {
    try {
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url = `${GENERAL_URL}/signup`;
      const response = await axios.post<IUserData>(url, data, reqConfig);
      return response.data;
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchSignIn = createAsyncThunk<IUserData, object>(
  'users/fetchSignIn',
  async (data: object, { rejectWithValue }) => {
    try {
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url = `${GENERAL_URL}/signin`;
      const response = await axios.post<IUserData>(url, data, reqConfig);
      return response.data;
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchEditProfile = createAsyncThunk<IUserData, object>(
  'users/fetchEditProfile',
  async (data: object, { rejectWithValue }) => {
    try {
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url = `${GENERAL_URL}/edit`;
      const response = await axios.post(url, data, reqConfig);
      return response.data;
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);
