import axios from 'axios';
import { PROTOCOL, SERVER_HOST, SERVER_PORT } from '../../config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserData } from '../../types/user';

const GENERAL_URL = `${PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/users`;

export const fetchSignUp = createAsyncThunk<IUserData, object>(
  'users/fetchSignUp',
  async (data: object, { rejectWithValue }) => {
    try {
      const url: string = `${GENERAL_URL}/signup`;
      const response = await axios.post<IUserData>(url, data, { 
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": url,
        },
      });
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
      const url: string = `${GENERAL_URL}/signin`;
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": url,
        },
      });
      return response.data;
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);


