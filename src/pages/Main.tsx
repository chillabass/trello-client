import React from 'react';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { styled } from '@mui/styles';
import store from '../store/store';

export const Mainpage: React.FC = () => {
  const navigate = useNavigate();
  const isAuth = store.getState().users.isAuth

  return (
    <>
      {!isAuth ? 
    <StyledContainer>
      <StyledTypography
        variant="h5"
        gutterBottom>
        Trello поможет организовать что угодно: от этапов крупного проекта до мелких задач. 
        Работайте вместе откуда угодно, даже с мобильных телефонов. ... Trello помогает командам эффективно решать рабочие задачи. 
        Работайте в команде, управляйте проектами и выводите продуктивность на новый уровень собственным уникальным способом вместе с Trello. 
        Зарегистрируйтесь — это бесплатно!
      </StyledTypography>
    </StyledContainer>
    : <Navigate to='/profile' />}
    </>
)};

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  padding: '30px 30px',
});

const StyledTypography = styled(Typography)({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
});
