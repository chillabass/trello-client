import React from "react";
import styled from 'styled-components';

export const BoardHeader: React.FC = () => {
  return (
    <StyledBoardHeader>
      <StyledBoardItem>
        Board Name
      </StyledBoardItem>
      <StyledBoardItem>
        Workspace Name
      </StyledBoardItem>
    </StyledBoardHeader>
  );
}

const StyledBoardHeader = styled.div`
  height: 35px;
  background-color: #EBECF0;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const StyledBoardItem = styled.div`
  background-color: rgb(204, 204, 204);
  padding: 5px 10px;
  border-radius: 7px;
  margin: 0 10px;
  cursor: pointer;
`;