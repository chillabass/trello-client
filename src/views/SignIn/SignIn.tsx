import React, { SyntheticEvent } from 'react';
import { Navigate } from 'react-router';
import { FormItem } from '../../components/FormItem/FormItem';
import { fetchSignIn } from '../../store/sliceUser/thunkUser';
import { useAppDispatch, useAppSelector } from '../../utils/hook/redux';
import { StyledButton, StyledForm, StyledSignup, StyledTitle } from './SignIn.styles';

interface UserData {
  login: string;
  password: string;
};

export const Signinpage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.users.isAuth);

  const onSubmitHandler = (event: SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      login: { value: string };
      password: { value: string };
    };
    const userData: UserData = {
      login: target.login.value,
      password: target.password.value,
    };
    dispatch(fetchSignIn(userData));
  }

  return (
    isAuth ? <Navigate to='/profile' /> :
      <StyledSignup>
        <StyledTitle>Authentication</StyledTitle>
        <StyledForm onSubmit={onSubmitHandler}>
          <FormItem
            label='Login'
            name='login'
            inputType='text' />
          <FormItem
            label='Password'
            name='password'
            inputType='password' />
          <StyledButton>Sign in</StyledButton>
        </StyledForm>
      </StyledSignup>
  )
};
