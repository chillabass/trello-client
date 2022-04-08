import React from 'react';
import { Typography } from '@mui/material';
import { ProfileInfo } from '../../components/ProfileInfo';
import { ProfileDesks } from '../../components/ProfileDesks';
import { StyledContainer } from './Profile.styles';

export const Profilepage: React.FC = () => {
  return (
    <StyledContainer>
      <ProfileInfo />
      <Typography variant='h4'>Desks</Typography>
      <ProfileDesks />
    </StyledContainer>
  );
};
