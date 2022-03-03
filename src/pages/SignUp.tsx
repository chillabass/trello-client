import React from 'react';
import styled from 'styled-components';
import { FormItem } from '../components/FormItem';

export const Signuppage: React.FC = () => {
  return (
    <StyledSignup>
      <StyledTitle>Registration</StyledTitle>
      <StyledForm>
        <FormItem
          label='Login'
          inputType='text' />
        <FormItem
          label='E-mail'
          inputType='email' />
        <FormItem
          label='Password'
          inputType='password' />
        <FormItem
          label='Confirm password'
          inputType='password' />
        <FormItem
          label='Fullname'
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

const StyledFormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 0;
`;

const StyledLabel = styled.label`
  margin-bottom: 10px;
  text-align: left;
  font-size: 16px;
  font-style: italic;
`;

const StyledInput = styled.input`
  border: none;
  border-radius: 5px;
  height: 37px;
  font-size: 18px;
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