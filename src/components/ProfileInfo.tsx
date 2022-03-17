import React from 'react';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { IUser } from '../types/user';
import { useNavigate } from 'react-router';
import { signout } from '../store/reducers/userReducer';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export const ProfileInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user: IUser = useAppSelector(state => state.users.currentUser);

  const clickEditHandler = () => {

  };

  const clickSignoutHandler = () => {
    dispatch(signout(''));
    navigate('/');
  };

  return (
    <StyledContainer>
      <StyledInfoLeft>
        <StyledAvatar />
      </StyledInfoLeft>
      <StyledInfoRight>
        <StyledTypography
          variant="body1"
          gutterBottom>
          {`Login: ${user.login}`}
        </StyledTypography>
        <StyledTypography
          variant="body1"
          gutterBottom>
          {`Full name: ${user.fullName}`}
        </StyledTypography>
        <StyledTypography
          variant="body1"
          gutterBottom>
          {`E-Mail: ${user.email}`}
        </StyledTypography>
        <StyledTypography
          variant="body1"
          gutterBottom>
          {`Role: ${user.role}`}
        </StyledTypography>
        <Button
          disabled
          color='primary'
          onClick={clickEditHandler}
          variant='contained'
          style={{ marginRight: '15px' }}>
          Редактировать
        </Button>
        <Button
          color='error'
          onClick={clickSignoutHandler}
          variant='contained'>
          Выйти
        </Button>
      </StyledInfoRight>
    </StyledContainer>
  )
}

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  padding: '30px',
});


const StyledInfoLeft = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
});

const StyledAvatar = styled(Avatar)({
  minWidth: 100,
  minHeight: 100,
  margin: '15px',
});

const StyledInfoRight = styled(Box)({
  maxWidth: 800,
  marginBottom: '20px',
  marginRight: '20px',
});

const StyledTypography = styled(Typography)({
  display: 'flex',
  flexDirection: 'column',
});