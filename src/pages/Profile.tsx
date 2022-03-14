import React from 'react';
import { styled } from '@mui/styles';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signout } from '../store/reducers/userReduser';
import { useNavigate } from 'react-router-dom';

export const Profilepage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = () => {
    dispatch(signout(''));
    navigate('/');
  }

  return (
    <StyledContainer>
      <Avatar sx={{ width: 100, height: 100 }}/>
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="body1" gutterBottom>
          Login:
        </Typography>
      </Box>
      <Button onClick={clickHandler}>Выйти</Button>
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)({
  display: 'flex',
  padding: '30px 30px',
});
