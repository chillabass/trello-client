import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { BoardHeader } from '../../components/BoardHeader/BoardHeader';
import { Column } from '../../components/Column/Column';
import { CreateButton } from '../../components/CreateButton/CreateButton';
import { FormDialog as Form } from '../../components/CreatingForm/CreatingForm';
import { IColumn } from '../../types/column';
import { Container, Draggable, DropResult } from 'react-smooth-dnd';
import { applyDrag, sortItemsByPositions } from '../../utils/items/itemsOrder';
import { socket } from '../../api/socket';
import { useAppDispatch, useAppSelector } from '../../utils/hook/redux';
import { StyledColumnsWrapper } from './Desk.styles';
import { deskActions } from '../../store/sliceDesk/sliceDesk';
import { COLUMN_ADD, DESK_UPDATE_POSITIONS } from '../../utils/constants/socketEventTypes';

export const Deskpage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [formActive, setFormActive] = useState(false);
  const { id } = useParams();

  const desks = useAppSelector(state => state.desks.desks);
  const deskId = Number(id);
  const deskTitle: string = desks[deskId].title;

  let positions = desks[deskId].positions;

  const allColumns = useAppSelector(state => state.columns.columns);
  const columns: IColumn[] = [];

  positions.map((pos: number) => columns.push(allColumns[pos]));

  const createColumnHandler = () => {
    setFormActive(true);
  };

  const getData = (title: string | null | undefined) => {
    if (title) {
      socket.emit(COLUMN_ADD, { title, deskId });
    }
  }

  const onColumnDrop = (dropResult: DropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      positions = desks[deskId].positions;
      const newPositions = applyDrag(positions, dropResult);
      dispatch(deskActions.updateColumnPositions({ id: deskId, pos: newPositions }));
      socket.emit(DESK_UPDATE_POSITIONS, { deskId, positions: newPositions });
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
