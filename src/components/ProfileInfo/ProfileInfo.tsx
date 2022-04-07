import React, { useState } from 'react';
import { Button } from '@mui/material';
import { IUser } from '../../types/user';
import { useNavigate } from 'react-router';
import { getUser, signout } from '../../store/slicers/userSlicer';
import { EditFormDialog } from './EditProfileForm';
import { IEditData } from '../../types/editProfile';
import { fetchChangeAvatar, fetchEditProfile } from '../../store/asyncActions/userActions';
import { FileFormDialog } from '../LoadAvatarForm/LoadAvatarForm';
import { IAvatar } from '../../types/avatar';
import { BASE_URL } from '../../utils/constants/server';
import { useAppDispatch, useAppSelector } from '../../utils/hook/redux';
import { 
  StyledAvatar,
  StyledContainer,
  StyledInfoLeft,
  StyledInfoRight,
  StyledTypography 
} from './ProfileInfo.styles';

export const ProfileInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user: IUser = useAppSelector(getUser);
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
        <StyledAvatar src={`${BASE_URL}/${user.avatar}`}/>
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
          style={{ marginRight: '15px', marginBottom: '15px' }}>
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
};
