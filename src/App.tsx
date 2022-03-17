import React, { createContext, useContext, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Routes, Route, Navigate, RouteProps } from 'react-router-dom';

import { Mainpage } from './pages/Main';
import { Signuppage } from './pages/SignUp';
import { Signinpage } from './pages/SignIn';
import { NotFoundpage } from './pages/NotFound';
import { Profilepage } from './pages/Profile';
import { PrivateRoute } from './hoc/PrivateRouter';

export const App: React.FC = () => {
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
        path='*'
        element={<NotFoundpage />}
      />
    </Routes>
  </>
  )
};
