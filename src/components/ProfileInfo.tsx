import React, { useState } from 'react';
import { Avatar, Box, Button, Container, Link, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { IUser } from '../types/user';
import { useNavigate } from 'react-router';
import { signout } from '../store/reducers/userReducer';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { EditFormDialog } from './EditProfileForm';
import { IEditData } from '../types/editProfile';
import { fetchChangeAvatar, fetchEditProfile } from '../store/asyncActions/userActions';
import { FileFormDialog } from './LoadAvatar';
import { IAvatar } from '../types/avatar';
import { PROTOCOL, SERVER_HOST, SERVER_PORT } from '../config';

export const ProfileInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user: IUser = useAppSelector(state => state.users.currentUser);
  const [formActive, setFormActive] = useState(false);
  const [avatarActive, setAvatarActive] = useState(false);

  const getData = (data: IEditData) => {
    console.log(data);
    dispatch(fetchEditProfile(data));
  }

  const clickAvatarHandler = () => {
    setAvatarActive(true)
  }

  const getAvatar = (data: IAvatar) => {
    dispatch(fetchChangeAvatar(data));
  }

  const clickEditHandler = () => {
    setFormActive(true);
  };

  const clickSignoutHandler = () => {
    dispatch(signout(''));
    navigate('/');
  };

  return (
    <StyledContainer>
      <StyledInfoLeft>
        <StyledAvatar src={`${PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/${user.avatar}`}/>
        <Button
          color='primary'
          onClick={clickAvatarHandler}
          variant='contained'
        >
          Change Avatar
        </Button>
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
        <EditFormDialog
            open={formActive}
            setOpen={setFormActive}
            getData={getData}
        />
        <FileFormDialog 
          open={avatarActive}
          setOpen={setAvatarActive}
          getData={getAvatar}
        />
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
  flexDirection: 'column',
  alignItems: 'center',
  margin: '10px',
});

const StyledAvatar = styled(Avatar)({
  minWidth: 100,
  minHeight: 100,
  margin: '15px',
});

const StyledOFD = styled(Button)({
  color: '#0d74ce',
  cursor: 'pointer',
  transition: '.2s',
  textDecoration: 'none',
  '&:hover': {
    color: '#6197b6',
  },
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
