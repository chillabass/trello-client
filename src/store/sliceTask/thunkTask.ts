import api from '../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITask } from '../../types/task';
import { taskActions } from './sliceTask';
import { columnActions } from '../sliceColumn/sliceColumn';

export const fetchAddTask = createAsyncThunk(
  'tasks/fetchAddTask',
  async (data: { columnId: number; title: string; priority: number; }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post<{ message: string; task: ITask }>('/tasks/add', data);
      dispatch(taskActions.setOneTask(response.data.task));
      dispatch(columnActions.setNewTaskPositionInArray({ columnId: response.data.task.columnId, taskId: response.data.task.id, }))
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
      const response = await api.post<{ message: string; task: ITask }>('/tasks/edit', data);
      dispatch(taskActions.setOneTask(response.data.task));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchDeleteTask = createAsyncThunk(
  'tasks/fetchDeleteTask',
  async (data: { id: number }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post<{ message: string; deleted: boolean; id: number }>('/tasks/delete', data);
      if (response.data.deleted) dispatch(taskActions.deleteTask(response.data.id));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);

export const fetchMoveTask = createAsyncThunk(
  'tasks/fetchMoveTask',
  async (data: { id: number; columnId: number; }, { rejectWithValue }) => {
    try {
      await api.post<{ message: string; id: number; columnId: number; }>('/tasks/move', data);
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);
