import React, { useState } from 'react';
import styled from 'styled-components';
import { Task } from './Task';
import plusIcon from '../img/plus.svg';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ITask } from '../types/task';
import { FormDialog as Form } from './CreatingForm';
import { addTask } from '../store/reducers/taskReducer';

interface ColumnProps {
  id: string;
  title: string;
}

export const Column: React.FC<ColumnProps> = ({ id, title }) => {
  const dispatch = useAppDispatch();

  const [formActive, setFormActive] = useState(false);

  const allTasks: ITask[] = useAppSelector(state => state.tasks.tasks);
  const tasks: ITask[] = allTasks.filter((task: ITask) => task.columnId === id);

  const addTaskHandler = () => {
    setFormActive(true);
  }

  const getTitle = (title: string | null | undefined) => {
    const columnId = id;
    if(title) dispatch(addTask({ title, columnId, }));
  }

  return (
    <StyledColumn id={id}>
      <StyledColumnHeader>
        <StyledColumnTitle>{title}</StyledColumnTitle>
        <StyledColumnMenu>...</StyledColumnMenu>
      </StyledColumnHeader>
        {
        tasks.map((task: ITask) => <Task 
          title={task.title}
          columnId={id}
        />)
        }
      <StyledFooter onClick={addTaskHandler}>
        <StyledIcon src={plusIcon} alt="add_icon" />
        <p>Add to card</p>
      </StyledFooter>
      <Form 
        open={formActive} 
        setOpen={setFormActive}
        dialogTitle='New task'
        dialogContentText='Enter task desription'
        label='Task'
        getTitle={getTitle}
      />
    </StyledColumn>
  );
}

const StyledColumn = styled.div`
  min-height: 70px;
  height: fit-content;
  width: 272px;
  background-color: #ebecf0;
  border-radius: 5px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0px 3px 12px 1px #8b8b8b;
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
    box-shadow: 0px 1px 6px -1px #0055ff;
  }
`;

const StyledIcon = styled.img`
  width: 16px;
  margin-right: 10px;
  opacity: .3;
`;