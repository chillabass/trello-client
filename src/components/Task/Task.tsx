import React, { useState } from 'react';
import { StyledOverlay, StyledParagraph, StyledTask } from './Task.styles';
import { TaskEditForm } from './TaskEditForm';

interface TaskProps {
  taskId: number;
  title: string;
  description: string;
  columnId: number;
  priority: number;
};

export const Task: React.FC<TaskProps> = ({ title, taskId, columnId, priority, description }) => {
  const [taskEditActive, setTaskEditActive] = useState(false);

  const onClickHandler = () => {
    setTaskEditActive(true);
  }

  type ColorType = { [key: number]: string; }
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
    >
      <StyledOverlay
        className='task-overlay'
        onClick={onClickHandler}
      />
      <StyledParagraph>{title}</StyledParagraph>
      <TaskEditForm
        open={taskEditActive}
        setOpen={setTaskEditActive}
        taskId={taskId}
        columnId={columnId}
        priority={priority}
        title={title}
        description={description}
      />
    </StyledTask>
  );
};
