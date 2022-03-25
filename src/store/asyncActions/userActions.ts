import axios from 'axios';
import { PROTOCOL, SERVER_HOST, SERVER_PORT } from '../../config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, IUserData } from '../../types/user';
import { IAvatar } from '../../types/avatar';

const GENERAL_URL = `${PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`;

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
      const url = `${GENERAL_URL}/users/signup`;
      const response = await axios.post<IUserData>(url, data, reqConfig);
      return response.data;
      // dispatch(setUser({
      //   name: response.user.name
        
      // }))
      // dispatch(setDesks(response.user.desk))
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
      const url = `${GENERAL_URL}/users/signin`;
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
      const url = `${GENERAL_URL}/users/edit`;
      const response = await axios.post(url, data, reqConfig);
      return response.data;
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchChangeAvatar = createAsyncThunk(
  'users/fetchChangeAvatar',
  async (data: IAvatar, { rejectWithValue }) => {
    try {
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url = `${GENERAL_URL}/loads/loadAvatar`;
      const formData = new FormData();
      formData.append('avatar', data.file, data.name);
      const response = await axios.post(url, formData, reqConfig);
      return response.data;
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);
