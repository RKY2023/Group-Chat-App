import React, { useEffect, useCallback, useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import MainHeader from './components/Login/UI/MainHeader';
import Login from './components/Login/login';
import Chat from './components/chat/chat';

const App = () => {
  

  return (
    <div className="App">
      <MainHeader />
      
      <Switch>
        <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/chat'>
          <Chat />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
