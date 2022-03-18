import React from "react";
import styled from 'styled-components';

interface HeaderProps {
  title: string;
}

export const BoardHeader: React.FC<HeaderProps> = ({ title }) => {
  return (
    <StyledBoardHeader>
      <StyledBoardItem>
        {title}
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
  cursor: default;
`;