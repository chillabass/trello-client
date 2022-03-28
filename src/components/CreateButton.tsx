import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import plusIcon from '../img/plus.svg';

interface ButtonProps {
  title: string;
  onClick: (event: SyntheticEvent) => void;
}

export const CreateButton: React.FC<ButtonProps> = ({title, onClick}) => {
  return (
    <StyledButton 
        onClick={onClick}
      >
        <StyledIcon src={plusIcon} alt="add_icon" />
        {title}
    </StyledButton>
  );
};

const StyledIcon = styled.img`
  width: 16px;
  margin-right: 10px;
  opacity: .3;
`;

const StyledButton = styled.button`
  flex-shrink: 0;
  margin: 10px;
  width: 150px;
  height: 80px;
  max-width: 150px;
  font-size: 15px;
  border: 2px dashed #1faee9;
  border-radius: 5px;
  background-color: #87cefa;
  transition: .2s;
  cursor: pointer;

  &:hover {
    background-color: #7dc2ea;
  }
`;
