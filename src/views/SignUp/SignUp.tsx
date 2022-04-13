import React from 'react';
import { Navigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../utils/hook/redux';
import { fetchSignUp } from '../../store/sliceUser/thunkUser';
import {
  StyledButton,
  StyledErrorMessage,
  StyledField,
  StyledForm,
  StyledSignup,
  StyledTitle
} from './SignUp.styles';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';


export const Signuppage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.users.isAuth);

  return (
    isAuth ? <Navigate to='/profile' /> :
      <Formik
        initialValues={{
          login: '',
          email: '',
          password: '',
          confirm: '',
          fullName: '',
        }}
        validationSchema={Yup.object({
          login: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string()
            .min(6, 'Must be 6-20 characters')
            .max(20, 'Must be 6-20 characters')
            .required('Required'),
          confirm: Yup.string()
            .oneOf([Yup.ref('password')], `Passwords don't match`)
            .required('Requerid'),
          fullName: Yup.string()
            .max(60, 'Must be no more 60 characters')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(fetchSignUp(values));
        }}
      >
        <StyledSignup>
          <StyledTitle>Registration</StyledTitle>
          <StyledForm>
            <StyledField
              name="login"
              placeholder="Login"
            />
            <StyledErrorMessage>
              <ErrorMessage name="login" />
            </StyledErrorMessage>
            <StyledField
              name="email"
              type="email"
              placeholder="E-Mail"
            />
            <StyledErrorMessage>
              <ErrorMessage name="email" />
            </StyledErrorMessage>
            <StyledField
              name="password"
              type="password"
              placeholder="Password"
            />
            <StyledErrorMessage>
              <ErrorMessage name="password" />
            </StyledErrorMessage>
            <StyledField
              name="confirm"
              type="password"
              placeholder="Confirm Password"
            />
            <StyledErrorMessage>
              <ErrorMessage name="confirm" />
            </StyledErrorMessage>
            <StyledField
              name="fullName"
              placeholder="Full Name"
            />
            <StyledErrorMessage>
              <ErrorMessage name="fullName" />
            </StyledErrorMessage>

            <StyledButton type="submit">Register</StyledButton>
          </StyledForm>
        </StyledSignup>
      </Formik>
  )
};