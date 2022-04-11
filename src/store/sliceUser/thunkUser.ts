import api from '../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchChangeAvatar, IFetchEditProfile, IFetchSignIn, IFetchSignUp, IUser, IUserData } from '../../types/user';
import { userActions } from './sliceUser';
import { deskActions, IDeskObject } from '../sliceDesk/sliceDesk';
import { columnActions, IColumnObject } from '../sliceColumn/sliceColumn';
import { taskActions, ITaskObject } from '../sliceTask/sliceTask';
import { AppDispatch } from '../store';

export const fetchSignUp = createAsyncThunk<
  void,
  IFetchSignUp,
  {
    dispatch: AppDispatch,
  }
>(
  'users/fetchSignUp',
  async (data, thunkApi) => {
    try {
      const response = await api.post<IUserData>('/users/signup', data);
      const user: IUser = response.data.user;
      const token: string = response.data.token;
      const isAuth: boolean = !!user;

      thunkApi.dispatch(userActions.setUser(user));
      thunkApi.dispatch(userActions.setToken(token));
      thunkApi.dispatch(userActions.setIsAuth(isAuth));
      thunkApi.dispatch(deskActions.resetDesks());
      thunkApi.dispatch(columnActions.resetColumns());
      thunkApi.dispatch(taskActions.resetTasks());
    } catch (e: any) {
      alert(e.response?.data);
      return thunkApi.rejectWithValue(e.response?.data);
    }
  }
);

export const fetchSignIn = createAsyncThunk<
  void,
  IFetchSignIn,
  {
    dispatch: AppDispatch,
  }
>(
  'users/fetchSignIn',
  async (data, thunkApi) => {
    try {
      const response = await api.post('/users/signin', data);
      const user: IUser = response.data.user;
      const token: string = response.data.token;
      const isAuth: boolean = !!user;
      const desks: IDeskObject = response.data.user.desks;
      const columns: IColumnObject = response.data.user.columns;
      const tasks: ITaskObject = response.data.user.tasks;

      thunkApi.dispatch(userActions.setUser(user));
      thunkApi.dispatch(userActions.setToken(token));
      thunkApi.dispatch(userActions.setIsAuth(isAuth));
      thunkApi.dispatch(deskActions.setDesks(desks));
      thunkApi.dispatch(columnActions.setColumns(columns));
      thunkApi.dispatch(taskActions.setTasks(tasks));
    } catch (e: any) {
      alert(e.response?.data);
      return thunkApi.rejectWithValue(e.response?.data);
    }
  }
);

export const fetchEditProfile = createAsyncThunk<
  void,
  IFetchEditProfile,
  {
    dispatch: AppDispatch,
  }
>(
  'users/fetchEditProfile',
  async (data, thunkApi) => {
    try {
      const response = await api.post('/users/edit', data);
      thunkApi.dispatch(userActions.setUser(response.data.user));
    } catch (e: any) {
      alert(e.response?.data);
      return thunkApi.rejectWithValue(e.response?.data);
    }
  }
);

export const fetchChangeAvatar = createAsyncThunk<
void,
IFetchChangeAvatar,
{
  dispatch: AppDispatch,
}
>(
  'users/fetchChangeAvatar',
  async (data, thunkApi) => {
    try {
      const formData = new FormData();
      formData.append('avatar', data.file, data.name);
      const response = await api.post('/loads/loadAvatar', formData);
      thunkApi.dispatch(userActions.setUser(response.data.user));
    } catch (e: any) {
      alert(e.response?.data);
      return thunkApi.rejectWithValue(e.response?.data);
    }
  }
);

export const fetchGetUser = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch,
  }
>(
  'users/fetchGetUser',
  async (_: void, thunkApi) => {
    try {
      const response = await api.get('/users/getuser');
      const user = response.data.user;
      const token: string = response.data.token;
      const isAuth: boolean = !!user;
      const desks: IDeskObject = user.desks;
      const columns: IColumnObject = response.data.user.columns;
      const tasks: ITaskObject = response.data.user.tasks;

      thunkApi.dispatch(userActions.setUser(user));
      thunkApi.dispatch(userActions.setToken(token));
      thunkApi.dispatch(userActions.setIsAuth(isAuth));
      thunkApi.dispatch(deskActions.setDesks(desks));
      thunkApi.dispatch(columnActions.setColumns(columns));
      thunkApi.dispatch(taskActions.setTasks(tasks));
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.response?.data);
    }
  }
);
