import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { FormItem } from '../components/FormItem';
import { useDispatch } from 'react-redux';
import { fetchSignIn } from '../store/asyncActions/userActions';

interface UserData {
  login: string;
  password: string;
};

export const Signinpage: React.FC = () => {
  const dispatch = useDispatch();

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
  <StyledSignup>
    <StyledTitle>Authentication</StyledTitle>
    <StyledForm onSubmit={onSubmitHandler}>
      <FormItem 
        label='Login' 
        name='login' 
        inputType='text'/>
      <FormItem 
        label='Password' 
        name='password' 
        inputType='password'/>
      <StyledButton>Sign in</StyledButton>
    </StyledForm>
  </StyledSignup>
)};

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