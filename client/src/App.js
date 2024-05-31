import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import GroupChatsApp from './pages/groupchatapp';
import LoginPage from './pages/login';
import { uiActions } from './store/uiReducer';
import { authActions } from './store/authReducer';


const App = () => {
  const dispatch = useDispatch();
  // const NewGroupModal = useSelector(state => state.ui.isModalShown);

  useEffect(() => {
    dispatch(uiActions.updateUrl());
    dispatch(uiActions.setTheme());
    // console.log('App');
    dispatch(authActions.setUserId());
  },[dispatch]);

  return (
    <div className="App">
      {/* <h1 className='text-blue-500'> aaa</h1> */}
      {/* <MainHeader /> */}
      {/* {NewGroupModal && <NewGroupForm />}       */}
      <Switch>
        <Route path='/' exact>
          <LoginPage />
        </Route>
        <Route path='/chat'>
          {/* <MainView /> */}
        </Route>
        <Route path='/group'>
          <GroupChatsApp />
        </Route>
        <Route path='/chat'>
          
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
