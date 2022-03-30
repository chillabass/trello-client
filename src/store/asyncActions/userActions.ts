import axios from 'axios';
import { PROTOCOL, SERVER_HOST, SERVER_PORT } from '../../config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, IUserData } from '../../types/user';
import { IAvatar } from '../../types/avatar';
import { getToken, setIsAuth, setToken, setUser } from '../slicers/userSlicer';
import { resetDesks, setDesks } from '../slicers/deskSlicer';
import { IDesk } from '../../types/desk';
import { useAppSelector } from '../hooks';
import { IColumn } from '../../types/column';
import { resetColumns, setColumns } from '../slicers/columnSlicer';
import { ITask } from '../../types/task';
import { resetTasks, setTasks } from '../slicers/taskSlicer';

const GENERAL_URL = `${PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`;

const reqConfig = {
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": GENERAL_URL,
  }
};

export const fetchSignUp = createAsyncThunk(
  'users/fetchSignUp',
  async (data: object, { dispatch, rejectWithValue }) => {
    try {
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url = `${GENERAL_URL}/users/signup`;
      const response = await axios.post<IUserData>(url, data, reqConfig);
      const user: IUser = response.data.user;
      const token: string = response.data.token;
      const isAuth: boolean = !!user;
      dispatch(setUser(user));
      dispatch(setToken(token));
      dispatch(setIsAuth(isAuth));
      dispatch(resetDesks([]));
      dispatch(resetColumns([]));
      dispatch(resetTasks([]));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchSignIn = createAsyncThunk(
  'users/fetchSignIn',
  async (data: object, { dispatch, rejectWithValue }) => {
    try {
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url = `${GENERAL_URL}/users/signin`;
      const response = await axios.post(url, data, reqConfig);
      const user: IUser = response.data.user;
      const token: string = response.data.token;
      const isAuth: boolean = !!user;
      const desks: IDesk[] = response.data.user.desks;
      const columns: IColumn[] = response.data.user.columns;
      const tasks: ITask[] = response.data.user.tasks;
      dispatch(setUser(user));
      dispatch(setToken(token));
      dispatch(setIsAuth(isAuth));
      dispatch(setDesks(desks));
      dispatch(setColumns(columns));
      dispatch(setTasks(tasks));
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

export const fetchGetUser = createAsyncThunk(
  'users/fetchGetUser',
  async (_: void, { dispatch, rejectWithValue}) => {
    try {
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url = `${GENERAL_URL}/users/auth`;
      const response = await axios.get(url, reqConfig);
      const user: IUser = response.data.user;
      const token: string = response.data.token;
      const isAuth: boolean = !!user;
      const desks: IDesk[] = response.data.user.desks;
      const columns: IColumn[] = response.data.user.columns;
      const tasks: ITask[] = response.data.user.tasks;
      dispatch(setUser(user));
      dispatch(setToken(token));
      dispatch(setIsAuth(isAuth));
      dispatch(setDesks(desks));
      dispatch(setColumns(columns));
      dispatch(setTasks(tasks));
    } catch (e: any) {
      // alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);
