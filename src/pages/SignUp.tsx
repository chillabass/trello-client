import React, { SyntheticEvent, useRef } from 'react';
import styled from 'styled-components';
import { FormItem } from '../components/FormItem';
import validator from 'validator';
import { fetchSignUp } from '../store/asyncActions/userActions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Navigate } from 'react-router';
import { getAuth } from '../store/slicers/userSlicer';

interface UserData {
  [login: string]: string;
  email: string;
  password: string;
  confirm: string;
  fullName: string;
};

export const Signuppage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getAuth);
  
  const formRef = useRef<HTMLFormElement>(null);

  const isValidData = (userData: UserData): boolean => {
    // Удаляем пробелы и проверяем не пустые ли поля
    for (let key in userData) {
      userData[key] = userData[key].trim();
      if (userData[key] === '') {
        alert(`Поле ${key} не должно быть пустым!`);
        return false;
      } 
    }
    if (!validator.isEmail(userData['email'])) {
      alert('Введите корректный E-Mail');
      return false;
    }
    // Проверяем пароли
    if (userData.password.length > 5) {
      if (userData.password === userData.confirm) {
        return true;
      } else {
        alert('Пароли не совпадают!');
        return false;
      } 
    } else {
      alert('Пароль должен состоять минимум из 6 символов!');
      return false;
    }
  }

  const onSubmitHandler = (event: SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      login: { value: string };
      email: { value: string };
      password: { value: string };
      confirm: { value: string };
      fullname: { value: string };
    };
    const userData: UserData = {
      login: target.login.value,
      email: target.email.value,
      password: target.password.value,
      confirm: target.confirm.value,
      fullName: target.fullname.value,
    };
    if (isValidData(userData)) {
      dispatch(fetchSignUp(userData));
    }
  }

  return (
    isAuth ? <Navigate to='/profile' /> :
    <StyledSignup>
      <StyledTitle>Registration</StyledTitle>
      <StyledForm
        onSubmit={onSubmitHandler}
        ref={formRef}
      >
        <FormItem
          label='Login'
          name='login'
          inputType='text' />
        <FormItem
          label='E-mail'
          name='email'
          inputType='email' />
        <FormItem
          label='Password'
          name='password'
          inputType='password' />
        <FormItem
          label='Confirm password'
          name='confirm'
          inputType='password' />
        <FormItem
          label='Fullname'
          name='fullname'
          inputType='text' />
        <StyledButton>Register</StyledButton>
      </StyledForm>
    </StyledSignup>
  )
};

const StyledSignup = styled.div`
  background-color: #0069a5;
  text-align: center;
  color: #eee;
  font-size: 35px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled.h1`
  font-size: 50px;
`;

const StyledForm = styled.form`
  background-color: #ebecf0;
  color: #1b1b1b;
  font-size: 15px;
  width: 400px;
  height: fit-content;
  border-radius: 10px;
  padding: 10px 15px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  margin-right: 20px;
  color: #eef;
  background-color: #ff9926;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  transition: .2s;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #f88400;
  }
`;