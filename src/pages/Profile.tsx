import React from 'react';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signout } from '../store/reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/styles';
import { IUser } from '../types/user';
import store from '../store/store';

export const Profilepage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickEditHandler = () => {

  };

  const clickSignoutHandler = () => {
    dispatch(signout(''));
    navigate('/');
  };

  const user: IUser = store.getState().users.currentUser;

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
  );
}

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  padding: '30px 30px',
});

const StyledInfoLeft = styled(Box)({
});

const StyledAvatar = styled(Avatar)({
  minWidth: 100, 
  minHeight: 100,
  margin: '15px',
});

const StyledInfoRight = styled(Box)({
  width: '100%',
  maxWidth: 800,
  padding: '15px',
});

const StyledTypography = styled(Typography)({
  display: 'flex',
  flexDirection: 'column',
});
