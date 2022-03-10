import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Routes, Route } from 'react-router-dom';

import { Mainpage } from './pages/Main';
import { Signuppage } from './pages/SignUp';
import { Signinpage } from './pages/SignIn';
import { NotFoundpage } from './pages/NotFound';
import { Profilepage } from './pages/Profile';

export const App: React.FC = () => (
  <>
    <Header />
    <Routes>
      <Route 
        path="/" 
        element={<Mainpage />} 
      />
      <Route 
        path="/signup" 
        element={<Signuppage />} 
      />
      <Route 
        path="/signin" 
        element={<Signinpage />} 
      />
      <Route 
        path="/profile" 
        element={<Profilepage />} 
      />
      <Route 
        path="*" 
        element={<NotFoundpage />} 
      />
    </Routes>
  </>
);
