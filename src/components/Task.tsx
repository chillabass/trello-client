import React from 'react';
import styled from 'styled-components';

export const Task: React.FC = () => {
  return (
    <StyledTask>
      Task text
    </StyledTask>
  );
}

const StyledTask = styled.div`
  padding: 5px;
  margin: 5px 0;
  border-radius: 3px;
  box-shadow: 0px 1px 6px -1px #444;
  cursor: pointer;
`;