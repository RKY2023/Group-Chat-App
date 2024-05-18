import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainHeader from './components/Login/UI/MainHeader';
import Login from './components/Login/login';
import Chat from './components/chat/chats/chat';
import NewGroupForm from './components/group/NewGroup/form';
import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from './store/chatReducer';
import MainView from './components/chat/mainView';
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import GroupChatsApp from './pages/groupchatapp';
import LoginPage from './pages/login';

const App = () => {
  const dispatch = useDispatch();
  const NewGroupModal = useSelector(state => state.ui.isModalShown);

  useEffect(() => {
    dispatch(chatActions.setTheme());
    // console.log('App');
    dispatch(chatActions.setUserId());
  },[dispatch]);

  return (
    <div className="App">
      {/* <h1 className='text-blue-500'> aaa</h1> */}
      {/* <MainHeader /> */}
      {NewGroupModal && <NewGroupForm />}      
      <Switch>
        <Route path='/' exact>
          <LoginPage />
        </Route>
        <Route path='/chat'>
          <MainView />
        </Route>
        <Route path='/group'>
          <GroupChatsApp />
        </Route>
        <Route path='/chat'>
          <Chat />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
