import React from 'react';
import { Button } from '@mui/material';
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
    <>{desks.map((desk: { title: string; })=> {
      return (
        <CreateItem 
          title={desk.title}
        />
      );
    })}
      <Button 
        variant='outlined'
        onClick={addClickHandler}
      >
        Create desk!
      </Button>
    </>
  )
};
