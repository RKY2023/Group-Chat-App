// import { io } from 'socket.io-client';

// // "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5010';

// export const socket = io(URL);
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { chatActions } from './store/chatReducer';


export const socket = io('http://localhost:5010');

// export const SendMsgSocket = (msgData) => {
  
//   dispatch(chatActions.setNewChats(message));
//   return [0];
// }
// ['id', 'message', 'userId']
// dispatch(chatActions.setNewChats(data.threads));
const SocketComp = () => {
  const name = 'abc';
  useEffect(() => {
    // Setup logic here
    // appendMessage('You joined')
    // socket.emit('new-user', name)
  
    // socket.on('chat-message', data => {
    //   appendMessage(`${data.name}: ${data.message}`)
    // })
  
    // socket.on('user-connected', name => {
    //   appendMessage(`${name} connected`)
    // })
  
    // socket.on('user-disconnected', name => {
    //   appendMessage(`${name} disconnected`)
    // })
    return () => {
      // Cleanup logic here
    };
  }, []); 
  
  return(
    <>
    </>
  );
}

export default SocketComp;