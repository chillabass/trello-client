import React from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/styles';
import { ProfileInfo } from '../components/ProfileInfo';
import { ProfileDesks } from '../components/ProfileDesks';

export const Profilepage: React.FC = () => {

  return (
    <StyledContainer>
      <ProfileInfo />
      <ProfileDesks />
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  padding: '30px',
});

// const StyledInfoLeft = styled(Box)({
// });

// const StyledAvatar = styled(Avatar)({
//   minWidth: 100, 
//   minHeight: 100,
//   margin: '15px',
// });

// const StyledInfoRight = styled(Box)({
//   width: '100%',
//   maxWidth: 800,
//   padding: '15px',
// });

// const StyledTypography = styled(Typography)({
//   display: 'flex',
//   flexDirection: 'column',
// });
