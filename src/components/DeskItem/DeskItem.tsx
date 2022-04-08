import React, { SyntheticEvent, useState } from 'react';
import { DeskEditForm } from './DeskEditForm';
import { StyledContainer, StyledOverlay, StyledParagraph } from './DeskItem.styles';

interface ItemProps {
  title: string;
  href: string;
};

export const CreateItem: React.FC<ItemProps> = ({ title, href }) => {
  const [editFormActive, setEditFormActive] = useState(false);

  const onClickEditHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    setEditFormActive(true);
  }

  return (
    <StyledContainer
      key={href}
      to={`/desk/${href}`}
    >
      <StyledParagraph>{title}</StyledParagraph>
      <StyledOverlay
        className='desk-overlay'
        onClick={onClickEditHandler}
      />
      <DeskEditForm
        title={title}
        id={+href}
        open={editFormActive}
        setOpen={setEditFormActive}
      />
    </StyledContainer>
  );
};
