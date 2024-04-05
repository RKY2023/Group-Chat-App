import React, { useEffect, useCallback, useState } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import MainHeader from './components/Login/UI/MainHeader';
import Login from './components/Login/login';

const App = () => {
  

  return (
    <div className="App">
      <MainHeader />
      <Login />
    </div>
  );
}

export default App;
