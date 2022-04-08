import React, { useMemo, useState } from 'react';
import plusIcon from '../../assets/icon/plus.svg';

import { Task } from '../Task/Task';
import { ITask } from '../../types/task';
import { TaskCreateForm } from '../TaskCreateForm';
import { ColumnsEditForm } from './ColumnEditForm';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { applyDrag, sortItemsByPositions } from '../../utils/items/itemsOrder';
import { socket } from '../../api/socket';
import {
  StyledColumn,
  StyledColumnButton,
  StyledColumnHeader,
  StyledColumnMenu,
  StyledColumnTitle,
  StyledFooter,
  StyledIcon,
  StyledMenu
} from './Column.styles';
import { useAppDispatch, useAppSelector } from '../../utils/hook/redux';
import { columnActions } from '../../store/sliceColumn/sliceColumn';
import { taskActions } from '../../store/sliceTask/sliceTask';

interface ColumnProps {
  id: number;
  deskId: number;
  title: string;
}

export const Column: React.FC<ColumnProps> = ({ id, deskId, title }) => {
  const dispatch = useAppDispatch();

  const [formActive, setFormActive] = useState(false);
  const [editFormActive, setEditFormActive] = useState(false);
  const [byDesc, setByDesc] = useState(true);

  const allColumns = useAppSelector(state => state.columns.columns);
  const currentColumn = allColumns[id];
  const positions = currentColumn.positions;

  const allTasks = useAppSelector(state => state.tasks.tasks);
  const tasks = positions.map((pos: number) => allTasks[pos]);

  const addTaskHandler = () => {
    setFormActive(true);
  };

  const editHandler = () => {
    setEditFormActive(true);
  };

  const sortHandler = () => {
    const sortedPositions = byDesc ?
      tasks.sort((a, b) => b.priority - a.priority).map(item => item.id) :
      tasks.sort((a, b) => a.priority - b.priority).map(item => item.id);
    setByDesc(!byDesc);
    dispatch(columnActions.updateTaskPositions({ id, pos: sortedPositions }));
  }

  const getData = (title: string, priority: number) => {
    const columnId = id;
    if (title) {
      socket.emit('task:add', { title, columnId, priority });
    }
  };

  const onTaskDrop = (columnId: number, dropResult: DropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const positions = allColumns[id].positions;
      const newPositions = applyDrag(positions, dropResult);

      // update positions in columns on frontend
      dispatch(columnActions.updateTaskPositions({
        id: columnId,
        pos: newPositions
      }));

      if (dropResult.addedIndex !== null) {
        dispatch(taskActions.moveTask({
          id: dropResult.payload.id,
          columnId,
        }));
        socket.emit('task:move', { id: dropResult.payload.id, columnId, });
      }
      // update positions in columns  on backend
      socket.emit('column:updatePositions', { columnId, positions: newPositions });
    }
  };

  const getTaskPayload = (id: number, index: number) => {
    return tasks.filter(task => task.columnId === id)[index];
  }

  const tasksList = useMemo(() => {
    return sortItemsByPositions(Object.values(tasks), positions);
  }, [tasks, positions]);

  return (
    <StyledColumn>
      <StyledColumnHeader>
        <StyledColumnTitle className='column-drag-handle'>{title}</StyledColumnTitle>
        <StyledColumnMenu>
          <StyledMenu className='styled-menu'>
            <StyledColumnButton onClick={sortHandler}>Sort</StyledColumnButton>
            <StyledColumnButton onClick={editHandler}>Edit</StyledColumnButton>
          </StyledMenu>
        </StyledColumnMenu>

      </StyledColumnHeader>
      <Container
        groupName="col"
        onDrop={e => onTaskDrop(id, e)}
        getChildPayload={index => getTaskPayload(id, index)}
        dragClass="card-ghost"
        dropClass="card-ghost-drop"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'drop-preview'
        }}
      >
        {
          tasksList.map((task: ITask) => {
            return (
              <Draggable key={task.id}>
                <Task
                  taskId={task.id}
                  title={task.title}
                  columnId={+id}
                  priority={task.priority}
                  description={task.description}
                />
              </Draggable>);
          })
        }
      </Container>
      <StyledFooter onClick={addTaskHandler}>
        <StyledIcon src={plusIcon} alt="add_icon" />
        <p>Add to card</p>
      </StyledFooter>
      <TaskCreateForm
        open={formActive}
        setOpen={setFormActive}
        dialogTitle='New task'
        dialogContentText='Enter task desription'
        label='Task'
        getData={getData}
      />
      <ColumnsEditForm
        title={title}
        columnId={id}
        deskId={deskId}
        open={editFormActive}
        setOpen={setEditFormActive}
      />
    </StyledColumn>
  );
};

