import React from 'react';
import { ErrorMessage, Formik } from 'formik';
import { Navigate } from 'react-router';
import { fetchSignIn } from '../../store/sliceUser/thunkUser';
import { useAppDispatch, useAppSelector } from '../../utils/hook/redux';
import {
  StyledButton,
  StyledErrorMessage,
  StyledForm,
  StyledSignup,
  StyledTitle
} from './SignIn.styles';
import * as Yup from 'yup';
import { StyledField } from '../SignUp/SignUp.styles';

export const Signinpage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.users.isAuth);

  return (
    isAuth ? <Navigate to='/profile' /> :
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        validationSchema={Yup.object({
          login: Yup.string()
            .trim()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          password: Yup.string()
            .min(6, 'Must be 6-20 characters')
            .max(20, 'Must be 6-20 characters')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(fetchSignIn(values));
          setSubmitting(false);
        }}
      >
        <StyledSignup>
          <StyledTitle>Authentication</StyledTitle>
          <StyledForm>
            <StyledField
              name="login"
              placeholder="Login"
            />
            <StyledErrorMessage>
              <ErrorMessage name="login" />
            </StyledErrorMessage>
            <StyledField
              name="password"
              type="password"
              placeholder="Password"
            />
            <StyledErrorMessage>
              <ErrorMessage name="password" />
            </StyledErrorMessage>
            <StyledButton type="submit">Auth</StyledButton>
          </StyledForm>
        </StyledSignup>
      </Formik>
  )
};
