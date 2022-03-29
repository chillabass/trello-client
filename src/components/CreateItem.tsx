import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import editIcon from '../img/edit.svg';
import { DeskEditForm } from './DeskEditForm';

interface ItemProps {
  title: string;
  href: string;
};

interface OverlayProps {
  isActive: boolean;
};

export const CreateItem: React.FC<ItemProps> = ({ title, href }) => {
  const [overlayActive, setOverlayActive] = useState(false);
  const [editFormActive, setEditFormActive] = useState(false);

  const onMouseOverHandler = () => {
    setOverlayActive(true);
  };

  const onMouseOutHandler = () => {
    setOverlayActive(false);
  };

  const onClickEditHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('ebatb toro pot')
    setEditFormActive(true);
  }

  return (
    <StyledContainer
      to={`/desk/${href}`}
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
    >
      <StyledParagraph>{title}</StyledParagraph>
      <StyledOverlay
        isActive={overlayActive}
        onClick={onClickEditHandler}
      />
      <DeskEditForm 
        id={+href}
        open={editFormActive}
        setOpen={setEditFormActive}
      />
    </StyledContainer>
  );
};

const StyledParagraph = styled.p`
  font-size: 15px;
`;

const StyledContainer = styled(Link)`
  margin: 5px;
  padding: 5px 10px;
  width: 150px;
  height: 80px;
  max-width: 150px;
  border: 1px solid #5f5f5f;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
  -webkit-box-shadow: 0px 1px 8px 1px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 1px 8px 1px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 1px 8px 1px rgba(34, 60, 80, 0.2);
  transition: .2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledOverlay = styled.div<OverlayProps>`
  display: ${props => props.isActive ? 'block;' : 'none;'};
  position: absolute;
  top: 5px;
  right: 5px;
  width: 25px;
  height: 25px;
  border-radius: inherit;
  background-image: url(${editIcon});
  background-position: 50%;
  background-size: 80%;
  background-repeat: no-repeat;
  background-color: rgba(94, 94, 94, 0.3);
`;
