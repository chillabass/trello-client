import React, { useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './hoc/PrivateRouter';
import { useAppDispatch } from './store/hooks';
import { fetchGetUser } from './store/asyncActions/userActions';

import { Mainpage } from './pages/Main';
import { Signuppage } from './pages/SignUp';
import { Signinpage } from './pages/SignIn';
import { NotFoundpage } from './pages/NotFound';
import { Profilepage } from './pages/Profile';
import { Deskpage } from './pages/Desk';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGetUser());
  });

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
