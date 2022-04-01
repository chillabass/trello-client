import React, { useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { BoardHeader } from '../components/BoardHeader';
import { Column } from '../components/Column';
import { CreateButton } from '../components/CreateButton';
import { FormDialog as Form } from '../components/CreatingForm';
import { fetchAddColumn, fetchMoveColumn } from '../store/asyncActions/columnActions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getDesks, updateColumnPositions } from '../store/slicers/deskSlicer';
import { IColumn } from '../types/column';
import { IDesk } from '../types/desk';
import { getColumns } from '../store/slicers/columnSlicer';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { applyDrag } from '../services/utils/itemsOrder';

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

  const index = allColumns.findIndex(column => column.id === id);
  const positions = allColumns[index].positions;

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

  const onColumnDrop = (dropResult: DropResult) => {
    console.log('onColumnDrop:', dropResult);
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const index = desks.findIndex(desk => desk.id === deskId);
      const positions = desks[index].positions;    
      const newPositions = applyDrag(positions, dropResult);
      dispatch(updateColumnPositions({pos: newPositions})); // update on frontend
      dispatch(fetchUpdateColumnPositions({deskId, positions: newPositions})); // update on backend
    }
  };

  const getColumnPayload = (index: number) => {
    return columns.filter(column => column.deskId === deskId)[index];
  };

  return (
    <>
      <BoardHeader title={deskTitle} />
      <StyledColumnsWrapper>
        <Container
          orientation="horizontal"
          dragClass="card-ghost"
          dropClass="card-ghost-drop"  
          onDrop={e => onColumnDrop(e)}
          getChildPayload={index => getColumnPayload(index)}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}
        >
          {columns.map(column => {
            return (
            <Draggable key={column.id}>
              <Column
                title={column.title}
                id={column.id}
              />
            </Draggable>
            )
          }
          )}
        </Container>
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

