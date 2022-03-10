import React from 'react';
import styled from 'styled-components';
import { Task } from './Task';

export const Column: React.FC = () => {
  return (
    <StyledColumn>
      <StyledColumnHeader>
        <StyledColumnTitle>Title name</StyledColumnTitle>
        <StyledColumnMenu>...</StyledColumnMenu>
      </StyledColumnHeader>
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <StyledFooter>➕ Add to card</StyledFooter>
    </StyledColumn>
  );
}

const StyledColumn = styled.div`
  min-height: 70px;
  max-height: 100%;
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

const StyledFooter = styled.div`
  box-shadow: 0px 1px 6px -1px #444;
  padding: 5px;
  border-radius: 3px;
  margin: 5px 0;
  color: #888;
  font-size: 15px;
`;