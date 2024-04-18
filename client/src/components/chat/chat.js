import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './chat.css';
import ChatForm from "./chatForm";
import ShowChats from "./showChats";
import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from "../../store/chatReducer";
import Group from "../group/group";

const Chat = () => {
  const dispatch = useDispatch();
  const groupId = useSelector(state => state.chat.groupId);
  const lastMessageId = useSelector(state => state.chat.lastMsgId);
  const userId = useSelector(state => state.chat.loggedInUserId);
  const isInit = useSelector(state => state.chat.isInit);
  console.log(lastMessageId ,'user', userId, groupId );

  const getChats = async () => {
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
      // console.log(data);
      if(data.threads) {

        dispatch(chatActions.setNewChats(data.threads));
      }
  };

  const getOnlineUsers = async (userId) => {
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
      // console.log('uu',userId, lastMessageId);
      const newOnlineUserList = [];
      data.onlineUsers.forEach(u => {
        if(u.uid !== userId)
          newOnlineUserList.push(u.uid);
      });
      // console.log('RL',newOnlineUserList);
      dispatch(chatActions.setReceiverList(newOnlineUserList));
      dispatch(chatActions.setNewChats(data.onlineUsers));
        
      setInterval(async () => {
        // console.log('chat updated');
        // await getChats();
      },10000);
      
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
    if(data && data.message === 'success'){
      console.log(data.group);
      dispatch(chatActions.setNewGroup(data.group[0].id));
    }
  };
  
  useEffect(() => {
    console.log('Chat pg');
    // load chats
    if(groupId === 0) {
      checkGroup();
    }
    if(isInit) {      
      // getOnlineUsers(userId);
      // dispatch(chatActions.setIsInit());
    }
  },[userId]);

  useEffect(() => {
    // (async () => {
    //   console.log('aaa', lastMessageId);
    //   await getChats(userId, receiverList, lastMessageId);
    // })();
  },[])
  
  return (
    <>
    {/* <h1 className="text-center p-3">Chat App</h1> */}
    <Row style={{width: '100vw', height: '80vh' }}> 
      <Col xs={3} md={4} className="groups">
        <Group />
      </Col>
      <Col xs={9} md={8} className="chats">
        <Row>
          
        <ShowChats />
        {groupId}
        </Row>
        <Row className="chat-msg__Btn">

        <ChatForm />
        </Row>
      </Col>
    </Row>
    </>
  );
}

export default Chat;