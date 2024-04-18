import React, { useEffect, useCallback, useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import MainHeader from './components/Login/UI/MainHeader';
import Login from './components/Login/login';
import Chat from './components/chat/chat';
import NewGroupForm from './components/group/NewGroup/form';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const NewGroupModal = useSelector(state => state.ui.isModalShown);

  return (
    <div className="App">
      <MainHeader />
      {NewGroupModal && <NewGroupForm />}      
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
