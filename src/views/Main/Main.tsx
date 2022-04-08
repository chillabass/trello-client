import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../utils/hook/redux';
import { StyledContainer, StyledTypography } from './Main.styels';

export const Mainpage: React.FC = () => {
  const isAuth = useAppSelector(state => state.users.isAuth);

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
  )
};
