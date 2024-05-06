import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import MainHeader from './components/Login/UI/MainHeader';
import Login from './components/Login/login';
import Chat from './components/chat/chats/chat';
import NewGroupForm from './components/group/NewGroup/form';
import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from './store/chatReducer';
import MainView from './components/chat/mainView';

const App = () => {
  const dispatch = useDispatch();
  const NewGroupModal = useSelector(state => state.ui.isModalShown);

  useEffect(() => {
    dispatch(chatActions.setTheme());
    console.log('App');
    dispatch(chatActions.setUserId());
  },[dispatch]);

  return (
    <div className="App">
      <MainHeader />
      {NewGroupModal && <NewGroupForm />}      
      <Switch>
        <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/chat'>
          <MainView />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
