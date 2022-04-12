import React, { useMemo, useState } from 'react';
import { CreateItem } from '../DeskItem/DeskItem';

import { StyledContainer } from './ProfileDesks.styles';
import { CreateButton } from '../CreateButton/CreateButton';
import { FormDialog as Form } from '../CreatingForm/CreatingForm';
import { useAppDispatch, useAppSelector } from '../../utils/hook/redux';
import { fetchAddDesk } from '../../store/sliceDesk/thunkDesk';

export const ProfileDesks: React.FC = () => {
  const [formActive, setFormActive] = useState(false);
  const desks = useAppSelector(state => state.desks.desks);
  const dispatch = useAppDispatch();

  const addClickHandler = () => {
    setFormActive(true);
  };

  const desksList = useMemo(() => {
    return Object.values(desks);
  }, [desks]);

  const getTitle = (title: string) => {
    if (title) {
      dispatch(fetchAddDesk(title));
    }
  };

  return (
    <StyledContainer>
      {desksList.map((desk) => {
        return (
          <CreateItem
            key={desk.id}
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
        getData={getTitle}
      />
    </StyledContainer>
  );
};
