import api from '../../services/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITask } from '../../types/task';
import { deleteTask, editTask, moveTask, setOneTask } from '../slicers/taskSlicer';
import { setNewTaskPositionInArray } from '../slicers/columnSlicer';

export const fetchAddTask = createAsyncThunk(
  'tasks/fetchAddTask',
  async (data: { columnId: number; title: string; priority: number;}, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post<{message: string; task: ITask}>('/tasks/add', data);
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
      const response = await api.post<{message: string; task: ITask}>('/tasks/edit', data);
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
      const response = await api.post<{message: string; deleted: boolean; id: number}>('/tasks/delete', data);
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
      const response = await api.post<{message: string; id: number; columnId: number;}>('/tasks/move', data);
      // dispatch(moveTask({id: response.data.id, columnId: response.data.columnId}));
    } catch (e: any) {
      alert(e.response?.data);
      return rejectWithValue(e.response?.data);
    }
  }
);