import React, { useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { BoardHeader } from '../components/BoardHeader';
import { Column } from '../components/Column';
import { CreateButton } from '../components/CreateButton';
import { FormDialog as Form } from '../components/CreatingForm';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addColumns } from '../store/reducers/columnReducer';
import { IColumn } from '../types/column';
import { IDesk } from '../types/desk';

export const Deskpage: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [formActive, setFormActive] = useState(false);

  // Получаем массив всех досок
  const desks: IDesk[] = useAppSelector(state => state.desks.desks);
  // Из url получаем id доски
  const deskId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  // По id доски получаем ее название
  const deskTitle: string = desks.find((desk: { id: number; })=> desk.id === +deskId)?.title || 'unknown';
  
  // Получаем массив всех колонок
  const allColumns: IColumn[] = useAppSelector(state => state.columns.columns);
  // Получаем колонки, которые относятся к нашей доске
  const columns: IColumn[] = allColumns.filter((column: IColumn) => column.deskId === deskId);

  const createColumnHandler = () => {
    setFormActive(true);
  }

  const getTitle = (title: string | null | undefined) => {
    if(title) dispatch(addColumns({title, deskId}));
  }

  return (
  <>
    <BoardHeader title={deskTitle} />
    <StyledColumnsWrapper>
      {columns.map(column => <Column title={ column.title } id={ column.id } />)}
      <CreateButton title='Create new list!' onClick={createColumnHandler} />
      <Form 
        open={formActive} 
        setOpen={setFormActive}
        dialogTitle='List name'
        dialogContentText='Enter list name'
        label='List name'
        getTitle={getTitle}
      />
      {/* <Column title='hopa' id='c228'/>
      <Column title='hopa' id='c228'/>
      <Column title='hopa' id='c228'/>
      <Column title='hopa' id='c228'/>
      <Column title='hopa' id='c228'/>
      <Column title='hopa' id='c228'/>
      <Column title='hopa' id='c228'/> */}
    </StyledColumnsWrapper>
  </>
  )};


const StyledColumnsWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  overflow-x: auto;
`;