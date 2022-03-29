import React, { useState } from 'react';
import styled from 'styled-components';
import editIcon from '../img/edit.svg';
import { TaskEditForm } from './TaskEditForm';

interface TaskProps {
  taskId: number;
  title: string;
  columnId: number;
};

interface OverlayProps {
  isActive: boolean;
};

export const Task: React.FC<TaskProps> = ({ title, columnId, taskId }) => {
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

  return (
    <>
      <StyledTask
        onMouseOver={onMouseOverHandler}
        onMouseOut={onMouseOutHandler}
      >
        <StyledOverlay
          isActive={active}
          onClick={onClickHandler}
        />
        {title}
      <TaskEditForm 
        open={taskEditActive}
        setOpen={setTaskEditActive}
        taskId={taskId}
      />
      </StyledTask>
    </>
  );
};

const StyledTask = styled.div`
position: relative;
  padding: 5px;
  margin: 5px 0;
  border-radius: 3px;
  word-wrap: break-word;
  box-shadow: 0px 1px 6px -1px #444;
  cursor: pointer;
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