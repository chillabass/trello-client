import api from '../../services/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, IUserData } from '../../types/user';
import { IAvatar } from '../../types/avatar';
import { setIsAuth, setToken, setUser } from '../slicers/userSlicer';
import { resetDesks, setDesks } from '../slicers/deskSlicer';
import { IDesk } from '../../types/desk';
import { IColumn } from '../../types/column';
import { resetColumns, setColumns } from '../slicers/columnSlicer';
import { ITask } from '../../types/task';
import { resetTasks, setTasks } from '../slicers/taskSlicer';

export const fetchSignUp = createAsyncThunk(
  'users/fetchSignUp',
  async (data: object, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post<IUserData>('/users/signup', data);
      const user: IUser = response.data.user;
      const token: string = response.data.token;
      const isAuth: boolean = !!user;
      dispatch(setUser(user));
      dispatch(setToken(token));
      dispatch(setIsAuth(isAuth));
      dispatch(resetDesks([]));
      dispatch(resetColumns([]));
      dispatch(resetTasks());
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
      const response = await api.post('/users/signin', data);
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
      const response = await api.post('/users/edit', data);
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
      const formData = new FormData();
      formData.append('avatar', data.file, data.name);
      const response = await api.post('/loads/loadAvatar', formData);
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
      const response = await api.get('/users/auth');
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
      return rejectWithValue(e.response?.data);
    }
  }
);
