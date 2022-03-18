import React, { useState } from 'react';
import styled from 'styled-components';
import { CreateItem } from './CreateItem';
import { addDesk } from '../store/reducers/deskReducer';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { CreateButton } from './CreateButton';
import { FormDialog as Form } from './Form';

export const ProfileDesks: React.FC = () => {
  const [formActive, setFormActive] = useState(false);
  const desks = useAppSelector(state => state.desks.desks);
  const dispatch = useAppDispatch();

  const addClickHandler = () => {
    setFormActive(true);
  };

  const getTitle = (title: string | null | undefined) => {
    dispatch(addDesk({title,}));
  }

  return (
    <StyledContainer>
      {desks.map((desk: { title: string; id: string; })=> {
      return (
        <CreateItem
          title={desk.title}
          href={`${desk.id}`}
        />
      );
    })}
      <CreateButton
        title='Create desk!'
        onClick={addClickHandler}
      />
    <Form 
      open={formActive} 
      setOpen={setFormActive}
      dialogTitle='Desk name'
      dialogContentText='Enter desk name'
      label='Desk name'
      getTitle={getTitle}
    />
    </StyledContainer>
  );
};


const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
`;
