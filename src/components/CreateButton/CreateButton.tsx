import React, { SyntheticEvent } from 'react';
import plusIcon from '../../assets/icon/plus.svg';
import { StyledButton, StyledIcon } from './CreateButton.styles';

interface ButtonProps {
  title: string;
  onClick: (event: SyntheticEvent) => void;
};

export const CreateButton: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <StyledIcon src={plusIcon} alt="add_icon" />
      {title}
    </StyledButton>
  );
};
