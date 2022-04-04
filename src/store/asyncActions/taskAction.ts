import axios from 'axios';
import { PROTOCOL, SERVER_HOST, SERVER_PORT } from '../../config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITask } from '../../types/task';
import { deleteTask, editTask, moveTask, setOneTask } from '../slicers/taskSlicer';
import { setNewTaskPositionInArray } from '../slicers/columnSlicer';

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
  async (data: { columnId: number; title: string; priority: number;}, { dispatch, rejectWithValue }) => {
    try {
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url: string = `${GENERAL_URL}/add`;
      const response = await axios.post<{message: string; task: ITask}>(url, data, reqConfig);
      dispatch(setOneTask(response.data.task));
      dispatch(setNewTaskPositionInArray({columnId: response.data.task.columnId, taskId: response.data.task.id, }))
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchEditTask = createAsyncThunk(
  'tasks/fetchEditTask',
  async (data: { id: number; columnId?: number; title?: string; proirity?: number; position?: number; descript?: string; }, { dispatch, rejectWithValue }) => {
    try {
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url: string = `${GENERAL_URL}/edit`;
      const response = await axios.post<{message: string; task: ITask}>(url, data, reqConfig);
      dispatch(editTask(response.data.task));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchDeleteTask = createAsyncThunk(
  'tasks/fetchDeleteTask',
  async (data: {id: number}, { dispatch, rejectWithValue }) => {
    try {
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url: string = `${GENERAL_URL}/delete`;
      const response = await axios.post<{message: string; deleted: boolean; id: number}>(url, data, reqConfig);
      if (response.data.deleted) dispatch(deleteTask(response.data.id));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchMoveTask = createAsyncThunk(
  'tasks/fetchMoveTask',
  async (data: {id: number; columnId: number;}, { dispatch, rejectWithValue }) => {
    try {
      reqConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const url: string = `${GENERAL_URL}/move`;
      const response = await axios.post<{message: string; id: number; columnId: number;}>(url, data, reqConfig);
      // dispatch(moveTask({id: response.data.id, columnId: response.data.columnId}));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);