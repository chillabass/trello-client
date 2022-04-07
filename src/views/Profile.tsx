import React from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { ProfileInfo } from '../components/ProfileInfo';
import { ProfileDesks } from '../components/ProfileDesks';

export const Profilepage: React.FC = () => {
  return (
    <StyledContainer>
      <ProfileInfo />
      <Typography variant='h4'>Desks</Typography>
      <ProfileDesks />
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)({
  padding: '30px',
});
