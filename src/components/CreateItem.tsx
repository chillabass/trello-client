import React from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/styles';


interface ItemProps {
  title: string;
}

export const CreateItem: React.FC<ItemProps> = ({ title }) => {
  return (
    <>
      <StyledContainer>
        {title}
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled(Container)({
  fontSize: '15px',
  
});
