import React from 'react';
import styled from 'styled-components';

interface TaskProps {
  title: string;
  columnId: string;
}

export const Task: React.FC<TaskProps> = ({ title, columnId, }) => {
  

  return (
    <StyledTask>
      {title}
    </StyledTask>
  );
}

const StyledTask = styled.div`
  padding: 5px;
  margin: 5px 0;
  border-radius: 3px;
  word-wrap: break-word;
  box-shadow: 0px 1px 6px -1px #444;
  cursor: pointer;
`;