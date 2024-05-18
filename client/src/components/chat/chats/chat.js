import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './chat.css';
import ChatForm from "./chatForm";
import ShowChats from "./showChats";
import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from "../../../store/chatReducer";
import DefaultChat from "./defaultChat";

const Chat = () => {
  const dispatch = useDispatch();
  const groupId = useSelector(state => state.chat.groupId);
  const lastMessageId = useSelector(state => state.chat.lastMsgId);
  const userId = useSelector(state => state.chat.loggedInUserId);
  const isInit = useSelector(state => state.chat.isInit);
  const [chatLoaded, setChatLoaded] = useState(false);
  const [chatError, setChatError] = useState(false);
  const [chatErrorMsg, setChatErrorMsg] = useState();
  console.log(lastMessageId ,'user', userId, groupId, lastMessageId );

  const getChats = async (userId, groupId, lastMessageId) => {
    console.log('getchat called');
    const msgData = {
      user: userId,
      groupId,
      lastMessageId: lastMessageId
    }
    console.log(msgData);
    const response = await fetch("http://localhost:5000/getThread",{
        method: "POST",
        body: JSON.stringify(msgData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    const tt = new Date();
    console.log(tt.getMinutes(), tt.getSeconds());
    if(data.threads) {
      dispatch(chatActions.setNewChats(data.threads));
    } else {
      setChatError(true);
      setChatErrorMsg(data.error);
    }
  };

  

  const checkGroup = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:5000/checkGroup",{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    });
    const data = await response.json();
    console.log(data)
    if(data && data.status === 'success'){
      dispatch(chatActions.setNewGroup(data.group[0].id));
    }
  };
  
  useEffect(() => {
    console.log('Chat pg');
    // load chats
    // if(groupId === 0) {
    //   checkGroup();
    // }
    if(isInit) {      
      // getOnlineUsers();
      dispatch(chatActions.setIsInit());
    }
  },[]);

  useEffect(() => {
    const timer1 = setInterval(async () => {
      console.log('aaa', userId, groupId, lastMessageId);
      await getChats(userId, groupId, lastMessageId);
      (() => {
        clearInterval(timer1);
      })();
    }, 10000);
    
  },[userId, groupId, lastMessageId])

  let chatDiv = <DefaultChat />;
  if(chatError){
    chatDiv = 
    <>
    <Row>
      <h2>{chatError}</h2>
    </Row>
    </>
  }  else if(chatLoaded && !chatError && groupId > 0 ){
    chatDiv =
    <>
    <Row>
    <ShowChats />
    </Row>
    <Row className="chat-msg__Btn">
    <ChatForm />
    </Row>   
    </>
  }
  
  return (
    <>
    {chatDiv}
    </>
  );
}

export default Chat;