import { useEffect } from 'react';
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
      socket.off('column:updatePositions', columnUpdatePositionsHandler);
      socket.off('task:add', addTaskHandler);
      socket.off('task:edit', editTaskHandler);
      socket.off('task:delete', deleteTaskHandler);
      socket.off('task:move', moveTaskHandler);
    };
  }, []);
};
