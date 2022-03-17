import React from 'react';
import { Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { CreateItem } from './CreateItem';
import { addDesk } from '../store/reducers/deskReducer';
import { useAppSelector, useAppDispatch } from '../store/hooks';

export const ProfileDesks: React.FC = () => {
  const desks = useAppSelector(state => state.desks.desks);
  const dispatch = useAppDispatch();

  const addClickHandler = () => {
    dispatch(addDesk({title: 'Test!'}));
  };

  return (
    <StyledContainer>
      {desks.map((desk: { title: string; id: string; })=> {
      return (
        <CreateItem
          title={desk.title}
          href={desk.id}
        />
      );
    })}
      <StyledButton 
        onClick={addClickHandler}
      >
        Create desk!
      </StyledButton>
    </StyledContainer>
  )
};


const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
`;

const StyledButton = styled.button`
  padding: 5px 10px;
  margin: 5px;
  width: 150px;
  height: 80px;
  max-width: 150px;
  font-size: 15px;
  border: 2px dashed #1faee9;
  border-radius: 5px;
  background-color: #87cefa;
  padding: 0;
  transition: .2s;
  cursor: pointer;

  &:hover {
    background-color: #00bfff;
  }
`;