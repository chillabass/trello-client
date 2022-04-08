import api from '../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAvatar } from '../../types/avatar';
import { IUser, IUserData } from '../../types/user';
import { userActions } from './sliceUser';
import { deskActions, IDeskObject } from '../sliceDesk/sliceDesk';
import { columnActions, IColumnObject } from '../sliceColumn/sliceColumn';
import { taskActions, ITaskObject } from '../sliceTask/sliceTask';

export const fetchSignUp = createAsyncThunk(
  'users/fetchSignUp',
  async (data: object, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post<IUserData>('/users/signup', data);
      const user: IUser = response.data.user;
      const token: string = response.data.token;
      const isAuth: boolean = !!user;
      dispatch(userActions.setUser(user));
      dispatch(userActions.setToken(token));
      dispatch(userActions.setIsAuth(isAuth));
      dispatch(deskActions.resetDesks());
      dispatch(columnActions.resetColumns());
      dispatch(taskActions.resetTasks());
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
      const desks: IDeskObject = response.data.user.desks;
      const columns: IColumnObject = response.data.user.columns;
      const tasks: ITaskObject = response.data.user.tasks;

      dispatch(userActions.setUser(user));
      dispatch(userActions.setToken(token));
      dispatch(userActions.setIsAuth(isAuth));
      dispatch(deskActions.setDesks(desks));
      dispatch(columnActions.setColumns(columns));
      dispatch(taskActions.setTasks(tasks));
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
  async (_: void, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get('/users/auth');
      const user: IUser = response.data.user;
      const token: string = response.data.token;
      const isAuth: boolean = !!user;
      const desks: IDeskObject = response.data.user.desks;
      const columns: IColumnObject = response.data.user.columns;
      const tasks: ITaskObject = response.data.user.tasks;

      dispatch(userActions.setUser(user));
      dispatch(userActions.setToken(token));
      dispatch(userActions.setIsAuth(isAuth));
      dispatch(deskActions.setDesks(desks));
      dispatch(columnActions.setColumns(columns));
      dispatch(taskActions.setTasks(tasks));
    } catch (e: any) {
      return rejectWithValue(e.response?.data);
    }
  }
);
