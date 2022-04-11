import api from '../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITask } from '../../types/task';
import { taskActions } from './sliceTask';
import { columnActions } from '../sliceColumn/sliceColumn';
import { AppDispatch } from '../store';

export const fetchAddTask = createAsyncThunk<
  void,
  {
    columnId: number;
    title: string;
    priority: number;
  },
  {
    dispatch: AppDispatch,
  }
>(
  'tasks/fetchAddTask',
  async (data, thunkApi) => {
    try {
      const response = await api.post<{ message: string; task: ITask }>('/tasks/add', data);
      thunkApi.dispatch(taskActions.setOneTask(response.data.task));
      thunkApi.dispatch(columnActions.setNewTaskPositionInArray({ 
        columnId: response.data.task.columnId, 
        taskId: response.data.task.id, 
      }));
    } catch (e: any) {
      alert(e.response?.data);
      return thunkApi.rejectWithValue(e.response?.data);
    }
  }
);

export const fetchEditTask = createAsyncThunk<
  void,
  {
    id: number;
    columnId?: number;
    title?: string;
    proirity?: number;
    position?: number;
    descript?: string;
  },
  {
    dispatch: AppDispatch,
  }
>(
  'tasks/fetchEditTask',
  async (data, thunkApi) => {
    try {
      const response = await api.post<{ message: string; task: ITask }>('/tasks/edit', data);
      thunkApi.dispatch(taskActions.setOneTask(response.data.task));
    } catch (e: any) {
      alert(e.response?.data);
      return thunkApi.rejectWithValue(e.response?.data);
    }
  }
);

export const fetchDeleteTask = createAsyncThunk<
  void,
  {
    id: number;
  },
  {
    dispatch: AppDispatch,
  }
>(
  'tasks/fetchDeleteTask',
  async (data, thunkApi) => {
    try {
      const response = await api.post<{ message: string; deleted: boolean; id: number }>('/tasks/delete', data);
      if (response.data.deleted) {
        thunkApi.dispatch(taskActions.deleteTask(response.data.id));
      }
    } catch (e: any) {
      alert(e.response?.data);
      return thunkApi.rejectWithValue(e.response?.data);
    }
  }
);

export const fetchMoveTask = createAsyncThunk<
  void,
  {
    id: number;
    columnId: number;
  },
  {
    dispatch: AppDispatch,
  }
>(
  'tasks/fetchMoveTask',
  async (data, thunkApi) => {
    try {
      await api.post<{ message: string; id: number; columnId: number; }>('/tasks/move', data);
    } catch (e: any) {
      alert(e.response?.data);
      return thunkApi.rejectWithValue(e.response?.data);
    }
  }
);
