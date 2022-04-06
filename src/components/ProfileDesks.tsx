import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { CreateItem } from './CreateItem';
import { fetchAddDesk } from '../store/asyncActions/deskActions';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { CreateButton } from './CreateButton';
import { FormDialog as Form } from './CreatingForm';
import { DeskObject } from '../store/slicers/deskSlicer';

export const ProfileDesks: React.FC = () => {
  const [formActive, setFormActive] = useState(false);
  const desks: DeskObject = useAppSelector(state => state.desks.desks);
  const dispatch = useAppDispatch();

  const addClickHandler = () => {
    setFormActive(true);
  };

  // const getTitle = (title: string) => {
  //   if (title) dispatch(fetchAddDesk(title));
  // }

  const desksList = useMemo(() => {
    return Object.values(desks);
  }, [desks]);

  const getTitle = useCallback((title: string) => {
    if (title) dispatch(fetchAddDesk(title));
  }, [])

  return (
    <StyledContainer>
      {/* {Object.values(desks).map((desk: { title: string; id: string; })=> { */}
      {desksList.map((desk) => {
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
      getData={getTitle}
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
