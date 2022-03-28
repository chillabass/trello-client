import axios from 'axios';
import { PROTOCOL, SERVER_HOST, SERVER_PORT } from '../../config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITask } from '../../types/task';
import { setOneTask } from '../reducers/taskReducer';

const GENERAL_URL = `${PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/tasks`;

const reqConfig = {
  headers: { 
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": GENERAL_URL,
  }
};

export const fetchAddTask = createAsyncThunk(
  'tasks/fetchAddTask',
  async (data: { columnId: number; title: string; }, { dispatch, rejectWithValue }) => {
    try {
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url: string = `${GENERAL_URL}/add`;
      const task: object = {
        title: data.title,
        columnId: data.columnId,
      };
      const response = await axios.post<{message: string; task: ITask}>(url, task, reqConfig);
      dispatch(setOneTask(response.data.task));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);