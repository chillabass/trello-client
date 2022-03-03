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
  box-shadow: 0px 1px 6px -1px #444;
  padding: 5px;
  border-radius: 3px;
  margin: 5px 0;
`;