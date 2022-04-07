import React, { useEffect } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './utils/hoc/PrivateRouter';
import { fetchGetUser } from './store/asyncActions/userActions';

import { Mainpage } from './views/Main';
import { Signuppage } from './views/SignUp';
import { Signinpage } from './views/SignIn';
import { NotFoundpage } from './views/NotFound';
import { Profilepage } from './views/Profile';
import { Deskpage } from './views/Desk';
import { useAppDispatch } from './utils/hook/redux';
import { useSocket } from './utils/hook/socket';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGetUser());
  });

  useSocket();

  return (
  <>
    <Header />
    <Routes>
      <Route
        path='/'
        element={<Mainpage />}
      />
      <Route
        path='/signup'
        element={<Signuppage />}
      />
      <Route
        path='/signin'
        element={<Signinpage />}
      />
      <Route
        path='/profile'
        element={
          <PrivateRoute>
            <Profilepage />
          </PrivateRoute>
        }
      />
      <Route
        path='/desk/:id'
        element={
          <PrivateRoute>
            <Deskpage />
          </PrivateRoute>
        }
      />
      <Route
        path='*'
        element={<NotFoundpage />}
      />
    </Routes>
  </>
  )
};
