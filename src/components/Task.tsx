import React, { useState } from 'react';
import { Draggable } from 'react-smooth-dnd';
import styled from 'styled-components';
import editIcon from '../img/edit.svg';
import { TaskEditForm } from './TaskEditForm';

interface TaskProps {
  taskId: number;
  title: string;
  description: string;
  columnId: number;
  priority: number;
};

interface OverlayProps {
  isActive: boolean;
};

export const Task: React.FC<TaskProps> = ({ title, columnId, taskId, priority, description }) => {
  const [active, setActive] = useState(false);
  const [taskEditActive, setTaskEditActive] = useState(false);

  const onMouseOverHandler = () => {
    setActive(true);
  }

  const onMouseOutHandler = () => {
    setActive(false);
  }

  const onClickHandler = () => {
    setTaskEditActive(true);
  }

  type ColorType = {[key: number]: string;}
  const Colors: ColorType = {
    1: 'initial;',
    2: '#6bda21;',
    3: '#e7e432;',
    4: '#e7772c;',
    5: '#f90000;',
  };

  return (
    
      <StyledTask
        color={Colors[priority]}
        onMouseOver={onMouseOverHandler}
        onMouseOut={onMouseOutHandler}
      >
        <StyledOverlay
          isActive={active}
          onClick={onClickHandler}
        />
        <StyledP>{title}</StyledP>
      <TaskEditForm 
        open={taskEditActive}
        setOpen={setTaskEditActive}
        taskId={taskId}
        priority={priority}
        title={title}
        description={description}
      />
      </StyledTask>
  );
};

const StyledTask = styled.div<{color: string;}>`
  position: relative;
  padding: 5px;
  margin: 5px 0;
  background-color: ${props => props.color};
  border-radius: 3px;
  box-shadow: 0px 1px 6px -1px #444;
  cursor: pointer;
`;

const StyledP = styled.p`
  word-wrap: break-word;
  padding-right: 15px;
`;

const StyledOverlay = styled.div<OverlayProps>`
  display: ${props => props.isActive ? 'block;' : 'none;'};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-image: url(${editIcon});
  background-position: 98%;
  background-size: 8%;
  background-repeat: no-repeat;
  background-color: rgba(170, 170, 170, 0.3);
`;