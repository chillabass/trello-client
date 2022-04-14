import React, { useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './utils/hoc/PrivateRouter';

import { Mainpage } from './views/Main';
import { Signuppage } from './views/SignUp';
import { Signinpage } from './views/SignIn';
import { NotFoundpage } from './views/NotFound/NotFound';
import { Profilepage } from './views/Profile';
import { Deskpage } from './views/Desk';
import { useAppDispatch } from './utils/hook/redux';
import { useSocket } from './utils/hook/socket';
import { fetchGetUser } from './store/sliceUser/thunkUser';
import { Spinner } from './components/Spinner/Spinner';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchGetUser());
      setIsLoading(false);
    })();
  }, []);

  useSocket();

  if (isLoading) return <Spinner />;

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
