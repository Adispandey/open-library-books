import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import SignInPage from './pages/LoginPage';
import {useAuth0} from '@auth0/auth0-react'

const App = () => {
  const {isAuthenticated} = useAuth0()
  return (
      <Routes>
        <Route path="/" element={isAuthenticated? <HomePage /> : <SignInPage />} />
      </Routes>
  );
};

export default App;
