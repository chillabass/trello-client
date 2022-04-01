import React, { useState } from 'react';
import styled from 'styled-components';
import plusIcon from '../img/plus.svg';
import editIcon from '../img/edit.svg';
import { Task } from './Task';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ITask } from '../types/task';
import { TaskCreateForm } from './TaskCreateForm';
import { fetchAddTask, fetchEditTask } from '../store/asyncActions/taskAction';
import { getTasks } from '../store/slicers/taskSlicer';
import { ColumnsEditForm } from './ColumnEditForm';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { getColumns, updateTaskPositions } from '../store/slicers/columnSlicer';
import { IColumn } from '../types/column';
import { applyDrag, sortItemsByPositions } from '../services/utils/itemsOrder';
import { fetchUpdateTaskPositions } from '../store/asyncActions/columnActions';

interface ColumnProps {
  id: number;
  title: string;
}

export const Column: React.FC<ColumnProps> = ({ id, title }) => {
  const dispatch = useAppDispatch();

  const [formActive, setFormActive] = useState(false);
  const [editFormActive, setEditFormActive] = useState(false);

  const allColumns: IColumn[] = useAppSelector(getColumns);
  const index = allColumns.findIndex(column => column.id === id);
  const positions = allColumns[index].positions;

  const allTasks: ITask[] = useAppSelector(getTasks);
  const tasks: ITask[] = allTasks.filter((task: ITask) => task.columnId === id);

  const addTaskHandler = () => {
    setFormActive(true);
  };

  const editHandler = () => {
    setEditFormActive(true);
  };

  const getData = (title: string, priority: number) => {
    const columnId = id;
    if (title) dispatch(fetchAddTask({ title, columnId, priority }));
  };

  const onTaskDrop = (columnId: number, dropResult: DropResult) => {
    console.log('onTaskDrop:', dropResult);
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const index = allColumns.findIndex(column => column.id === id);
      const positions = allColumns[index].positions;    
      const newPositions = applyDrag(positions, dropResult);
      console.log(`colId: ${columnId}, positions:\n${newPositions}`);
      dispatch(updateTaskPositions({id: columnId, pos: newPositions})); // update on frontend
      dispatch(fetchUpdateTaskPositions({columnId, positions: newPositions})); // update on backend
    }
  };

  const getTaskPayload = (id: number, index: number) => {
    return tasks.filter(task => task.columnId === id)[index];
  }

  return (
    <StyledColumn>
      <StyledColumnHeader>
        <StyledColumnTitle className='column-drag-handle'>{title}</StyledColumnTitle>
        <StyledColumnMenu onClick={editHandler} />
      </StyledColumnHeader>
      <Container
        groupName="col"
        onDragStart={e => console.log("drag started", e)}
        onDragEnd={e => console.log("drag end", e)}
        onDrop={e => onTaskDrop(id, e)}
        getChildPayload={index => getTaskPayload(id, index)}
        dragClass="card-ghost"
        dropClass="card-ghost-drop"
        onDragEnter={() => {
          console.log("drag enter:", id);
        }}
        onDragLeave={() => {
          console.log("drag leave:", id);
        }}
        onDropReady={p => console.log('Drop ready: ', p)}
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'drop-preview'
        }}
      >
        {
          sortItemsByPositions(tasks, positions).map((task: ITask) => {
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
        columnId={id}
        open={editFormActive}
        setOpen={setEditFormActive}
      />
    </StyledColumn>
  );
}

const StyledColumn = styled.div`
  min-height: 30px;
  height: fit-content;
  width: 300px;
  background-color: #ebecf0;
  border-radius: 5px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0px 3px 12px 1px #8b8b8b;
  flex-shrink: 0;
`;

const StyledColumnHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const StyledColumnTitle = styled.div`
  width: 85%;
  cursor: pointer;
`;

const StyledColumnMenu = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  background-image: url(${editIcon});
  background-size: 15px;
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    background-color: rgb(200, 200, 200);
  }
`;

const StyledFooter = styled.button`
  display: flex;
  justify-content: flex-start;
  padding: 5px;
  margin: 5px 0;
  border:none;
  border-radius: 3px;
  color: #888;
  font-size: 15px;
  box-shadow: 0px 1px 6px -3px #444;
  transition: .2s;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0px 1px 6px -1px #0068a2;
  }
`;

const StyledIcon = styled.img`
  width: 16px;
  margin-right: 10px;
  opacity: .3;
`;