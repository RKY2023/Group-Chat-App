import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './chat.css';
import ChatForm from "./chatForm";
import ShowChats from "./showChats";
import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from "../../store/chatReducer";

const Chat = () => {
  const dispatch = useDispatch();
  const receiverList = useSelector(state => state.chat.receiverList);
  const userId = useSelector(state => state.chat.loggedInUserId);
  const isInit = useSelector(state => state.chat.isInit);

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  const getChats = useCallback( async (userId, receiverList) => {
    const msgData = {
      user: userId,
      receiverList: receiverList
    }
      const response = await fetch("http://localhost:5000/getThread",{
          method: "POST",
          body: JSON.stringify(msgData),
          headers: {
              'Content-Type': 'application/json'
          }
      });
      const data = await response.json();
      console.log(data);
      if(data.threads) {

        dispatch(chatActions.setNewChats(data.threads));
      }
  },[userId, receiverList]);

  const getOnlineUsers = useCallback( async (userId) => {
    const response = await fetch("http://localhost:5000/api/onlineUsers",{
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    // console.log(data);
    if( data && data.onlineUsers){
      dispatch(chatActions.setUsers(data.onlineUsers));
      // console.log('uu',userId);
      const newReceiverList = [];
      data.onlineUsers.forEach(u => {
        if(u.uid !== userId)
          newReceiverList.push(u.uid);
      });
      // console.log('RL',newReceiverList);
      dispatch(chatActions.setReceiverList(newReceiverList));
      dispatch(chatActions.setNewChats(data.onlineUsers));
      // const timer1 = setTimeout( async () => {
        await getChats(userId, receiverList);
      // }, 1000);
      
    }

  },[]);
  
  useEffect(() => {
    console.log('Chat pg');
    // load chats
    if(isInit) {
      
      const userTokenData = parseJwt(localStorage.getItem('token'));
      // console.log(userTokenData, 'token user',userTokenData.userid);
      dispatch(chatActions.setUserId(userTokenData.userid));
      
      // getOnlineUsers(userTokenData.userid);
      setInterval(() => {
        console.log('chat updated');
        getOnlineUsers(userTokenData.userid);
      },1000);
      
      dispatch(chatActions.setIsInit());
    }
  },[getChats,getOnlineUsers]);
  
  return (
    <>
    <h1 className="text-center">Chat App</h1>
    <Container className="chats">
      <ShowChats />
      <ChatForm />
    </Container>
    </>
  );
}

export default Chat;