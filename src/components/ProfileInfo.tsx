import React from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { IUser } from '../types/user';
import store from '../store/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signout } from '../store/reducers/userReducer';

const user: IUser = store.getState().users.currentUser;



export const ProfileInfo: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickEditHandler = () => {

  };
  
  const clickSignoutHandler = () => {
    dispatch(signout(''));
    navigate('/');
  };
  
  return (
    <>
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
    </>
  )
}


const StyledInfoLeft = styled(Box)({
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
