import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { BoardHeader } from '../components/BoardHeader/BoardHeader';
import { Column } from '../components/Column/Column';
import { CreateButton } from '../components/CreateButton/CreateButton';
import { FormDialog as Form } from '../components/CreatingForm/CreatingForm';
import { getDesks, updateColumnPositions, } from '../store/slicers/deskSlicer';
import { IColumn } from '../types/column';
import { getColumns, } from '../store/slicers/columnSlicer';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { applyDrag, sortItemsByPositions } from '../utils/items/itemsOrder';
import { socket } from '../api';
import { useAppDispatch, useAppSelector } from '../utils/hook/redux';

export const Deskpage: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [formActive, setFormActive] = useState(false);

  const desks = useAppSelector(getDesks);
  const deskId = +location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  const deskTitle: string = desks[deskId].title;

  let positions = desks[deskId].positions;

  const allColumns = useAppSelector(getColumns);
  const columns: IColumn[] = [];

  positions.map((pos: number) => columns.push(allColumns[pos]));

  const createColumnHandler = () => {
    setFormActive(true);
  };

  const getData = (title: string | null | undefined) => {
    if (title) {
      socket.emit('column:add', { title, deskId });
    }
  }

  const onColumnDrop = (dropResult: DropResult) => {
    console.log('onColumnDrop:', dropResult);
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      positions = desks[deskId].positions;
      const newPositions = applyDrag(positions, dropResult);
      dispatch(updateColumnPositions({ id: deskId, pos: newPositions })); // update on frontend
      socket.emit('desk:updatePositions', { deskId, positions: newPositions });
    }
  };

  const getColumnPayload = (index: number) => {
    return columns.filter(column => column.deskId === deskId)[index];
  };

  const columnsList = useMemo(() => {
    return sortItemsByPositions(Object.values(columns), positions);
  }, [columns, positions]);

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
          {columnsList.map((column: IColumn) => {
            return (
              <Draggable key={column.id}>
                <Column
                  title={column.title}
                  id={column.id}
                  deskId={deskId}
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

