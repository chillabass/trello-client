import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { useEffect, useState } from 'react';
import { socket } from '../services/api';
import { deleteColumn, editColumn, setNewTaskPositionInArray, setOneColumn, updateOneColumn } from '../store/slicers/columnSlicer';
import { setNewColumnPositionInArray, updateOneDesk } from '../store/slicers/deskSlicer';
import { deleteTask, editTask, moveTask, setOneTask } from '../store/slicers/taskSlicer';
import { IColumn } from '../types/column';
import { IDesk } from '../types/desk';
import { ITask } from '../types/task';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSocket = () => {
  const dispatch = useAppDispatch();

  const deskUpdatePositionsHandler = (
    data: { 
      desk: IDesk; 
    }) => {
    dispatch(updateOneDesk(data.desk));
  };

  const addColumnHandler = (
    data: { 
      message: string; 
      column: IColumn; 
    }) => {
    dispatch(setOneColumn(data.column));
    dispatch(setNewColumnPositionInArray({ 
      deskId: data.column.deskId, 
      columnId: data.column.id 
    }));
  };

  const editColumnHandler = (
    data: { 
      message: string; 
      column: IColumn; 
    }) => {
    dispatch(editColumn(data.column));
  };
  
  const deleteColumnHandler = (
    data: {
      message: string;
      deleted: boolean;
      id: number,
      desk: {
        positions: number[]
      }
    }) => {
    if (data.deleted) {
      dispatch(deleteColumn(data.id));
      dispatch(updateOneDesk(data.desk));
    }
  };
  
  const columnUpdatePositionsHandler = (
    data: { 
      message: string; 
      column: IColumn 
    }) => {
    dispatch(updateOneColumn(data.column));
  };
  
  const addTaskHandler = (
    data: { 
      message: string; 
      task: ITask 
    }) => {
    dispatch(setOneTask(data.task));
    dispatch(setNewTaskPositionInArray({ columnId: data.task.columnId, taskId: data.task.id, }))
  };

  const editTaskHandler = (
    data: { 
      message: string; 
      task: ITask 
    }) => {
    dispatch(editTask(data.task));
  };

  const deleteTaskHandler = (
    data: { 
      message: string; 
      deleted: boolean; 
      id: number; 
    }) => {
    console.log('DELETED', data)
    if (data.deleted) {
      dispatch(deleteTask(data.id));
    }
  };

  const moveTaskHandler = (
    data: {
      message: string;
      id: number;
      columnId: number;
    }) => {
      dispatch(moveTask({id: data.id, columnId: data.columnId}));
  };

  useEffect(() => {
    socket.on('desk:updatePositions', deskUpdatePositionsHandler);
    socket.on('column:add', addColumnHandler);
    socket.on('column:edit', editColumnHandler);
    socket.on('column:delete', deleteColumnHandler);
    socket.on('column:updatePositions', columnUpdatePositionsHandler);
    socket.on('task:add', addTaskHandler);
    socket.on('task:edit', editTaskHandler);
    socket.on('task:delete', deleteTaskHandler);
    socket.on('task:move', moveTaskHandler);
    return () => {
    socket.off('desk:updatePositions', deskUpdatePositionsHandler);
    socket.off('column:add', addColumnHandler);
    socket.off('column:edit', editColumnHandler);
    socket.off('column:delete', deleteColumnHandler);
    socket.on('column:updatePositions', columnUpdatePositionsHandler);
    socket.off('task:add', addTaskHandler);
    socket.off('task:edit', editTaskHandler);
    socket.off('task:move', moveTaskHandler);
    };
  }, []);
}