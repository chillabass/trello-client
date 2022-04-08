import React, { SyntheticEvent, useRef } from 'react';
import validator from 'validator';
import { FormItem } from '../../components/FormItem/FormItem';
import { Navigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../utils/hook/redux';
import { fetchSignUp } from '../../store/sliceUser/thunkUser';
import { StyledButton, StyledForm, StyledSignup, StyledTitle } from './SignUp.styles';

interface UserData {
  [login: string]: string;
  email: string;
  password: string;
  confirm: string;
  fullName: string;
};

export const Signuppage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.users.isAuth);

  const formRef = useRef<HTMLFormElement>(null);

  const isValidData = (userData: UserData): boolean => {
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
