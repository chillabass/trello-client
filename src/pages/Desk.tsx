import React, { useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { BoardHeader } from '../components/BoardHeader';
import { Column } from '../components/Column';
import { CreateButton } from '../components/CreateButton';
import { FormDialog as Form } from '../components/CreatingForm';
import { fetchAddColumn } from '../store/asyncActions/columnActions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getDesks } from '../store/slicers/deskSlicer';
import { IColumn } from '../types/column';
import { IDesk } from '../types/desk';
import { getColumns } from '../store/slicers/columnSlicer';

export const Deskpage: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [formActive, setFormActive] = useState(false);

  // Получаем массив всех досок
  const desks: IDesk[] = useAppSelector(getDesks);
  // Из url получаем id доски
  const deskId = +location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  // По id доски получаем ее название
  const deskTitle: string = desks.find((desk: { id: number; }) => desk.id === +deskId)?.title || 'unknown';

  // Получаем массив всех колонок
  const allColumns: IColumn[] = useAppSelector(getColumns);
  // Получаем колонки, которые относятся к нашей доске
  const columns: IColumn[] = allColumns.filter((column: IColumn) => column.deskId === deskId);

  const createColumnHandler = () => {
    setFormActive(true);
  }

  const getData = (title: string | null | undefined) => {
    if (title) dispatch(fetchAddColumn({ title, deskId }));
  }

  return (
    <>
      <BoardHeader title={deskTitle} />
      <StyledColumnsWrapper>
        {columns.sort((lcolumn, rcolumn) => lcolumn.position - rcolumn.position).map(column =>
          <Column
            title={column.title}
            id={+column.id}
          />
        )}
        <CreateButton title='Create new list!' onClick={createColumnHandler} />
        <Form
          open={formActive}
          setOpen={setFormActive}
          dialogTitle='List name'
          dialogContentText='Enter list name'
          label='List name'
          getData={getData}
        />
      </StyledColumnsWrapper>
    </>
  )
};


const StyledColumnsWrapper = styled.div`
  display: flex;
  overflow-x: auto;
`;

