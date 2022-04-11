import { useEffect } from 'react';
import { COLUMN_ADD, COLUMN_DELETE, COLUMN_EDIT, COLUMN_UPDATE_POSITIONS, DESK_UPDATE_POSITIONS, TASK_ADD, TASK_DELETE, TASK_EDIT, TASK_MOVE } from '../constants/socketEventTypes';
import { socket } from '../../api/socket';
import { columnActions } from '../../store/sliceColumn/sliceColumn';
import { deskActions } from '../../store/sliceDesk/sliceDesk';
import { taskActions } from '../../store/sliceTask/sliceTask';
import { IColumn } from '../../types/column';
import { IDesk } from '../../types/desk';
import { ITask } from '../../types/task';
import { useAppDispatch } from './redux';

export const useSocket = () => {
  const dispatch = useAppDispatch();

  const deskUpdatePositionsHandler = (
    data: {
      desk: IDesk;
    }) => {
    dispatch(deskActions.setOneDesk(data.desk));
  };

  const addColumnHandler = (
    data: {
      message: string;
      column: IColumn;
    }) => {
    dispatch(columnActions.setOneColumn(data.column));
    dispatch(deskActions.setNewColumnPositionInArray({
      deskId: data.column.deskId,
      columnId: data.column.id
    }));
  };

  const editColumnHandler = (
    data: {
      message: string;
      column: IColumn;
    }) => {
    dispatch(columnActions.setOneColumn(data.column));
  };

  const deleteColumnHandler = (
    data: {
      message: string;
      deleted: boolean;
      id: number,
      desk: IDesk
    }) => {
    if (data.deleted) {
      dispatch(deskActions.setOneDesk(data.desk));
      dispatch(columnActions.deleteColumn(data.id));
    }
  };

  const columnUpdatePositionsHandler = (
    data: {
      message: string;
      column: IColumn
    }) => {
    dispatch(columnActions.setOneColumn(data.column));
  };

  const addTaskHandler = (
    data: {
      message: string;
      task: ITask
    }) => {
    dispatch(taskActions.setOneTask(data.task));
    dispatch(columnActions.setNewTaskPositionInArray({ columnId: data.task.columnId, taskId: data.task.id, }))
  };

  const editTaskHandler = (
    data: {
      message: string;
      task: ITask
    }) => {
    dispatch(taskActions.setOneTask(data.task));
  };

  const deleteTaskHandler = (
    data: {
      message: string;
      deleted: boolean;
      id: number;
      column: IColumn;
    }) => {
    if (data.deleted) {
      dispatch(columnActions.setOneColumn(data.column));
      dispatch(taskActions.deleteTask(data.id));
    }
  };

  const moveTaskHandler = (
    data: {
      message: string;
      id: number;
      columnId: number;
    }) => {
    dispatch(taskActions.moveTask({ id: data.id, columnId: data.columnId }));
  };

  useEffect(() => {
    socket.on(DESK_UPDATE_POSITIONS, deskUpdatePositionsHandler);
    socket.on(COLUMN_ADD, addColumnHandler);
    socket.on(COLUMN_EDIT, editColumnHandler);
    socket.on(COLUMN_DELETE, deleteColumnHandler);
    socket.on(COLUMN_UPDATE_POSITIONS, columnUpdatePositionsHandler);
    socket.on(TASK_ADD, addTaskHandler);
    socket.on(TASK_EDIT, editTaskHandler);
    socket.on(TASK_DELETE, deleteTaskHandler);
    socket.on(TASK_MOVE, moveTaskHandler);

    return () => {
      socket.off(DESK_UPDATE_POSITIONS, deskUpdatePositionsHandler);
      socket.off(COLUMN_ADD, addColumnHandler);
      socket.off(COLUMN_EDIT, editColumnHandler);
      socket.off(COLUMN_DELETE, deleteColumnHandler);
      socket.off(COLUMN_UPDATE_POSITIONS, columnUpdatePositionsHandler);
      socket.off(TASK_ADD, addTaskHandler);
      socket.off(TASK_EDIT, editTaskHandler);
      socket.off(TASK_DELETE, deleteTaskHandler);
      socket.off(TASK_MOVE, moveTaskHandler);
    };
  }, []);
};
