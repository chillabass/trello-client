import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Routes, Route, Link } from 'react-router-dom';

import { Mainpage } from './pages/Main';
import { NotFoundpage } from './pages/NotFound';

export const App: React.FC = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={ <Mainpage />} />
      <Route path="*" element={ <NotFoundpage />} />
    </Routes>
  </>
);
