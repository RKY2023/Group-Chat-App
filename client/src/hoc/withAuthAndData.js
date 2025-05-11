import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from '../store/chatReducer';
import { useHistory } from 'react-router-dom';

const withAuthAndData = (WrappedComponent) => {
  return (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const loggedInUserId = useSelector((state) => state.chat.loggedInUserId);

    useEffect(() => {
      if (!loggedInUserId) {
        history.push('/login');
      } else {
        dispatch(chatActions.setUserId());
        dispatch(chatActions.setNewChats([])); // Fetch initial chats or any other data
      }
    }, [loggedInUserId, dispatch, history]);

    if (!loggedInUserId) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthAndData;
