import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import UserJoined from "./userJoined";
import './chat.css';
import ChatForm from "./chatForm";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [isInitChats, setIsInitChats] = useState(true);
    const getChats = useCallback( async (msgData) => {
        const response = await fetch("http://localhost:5000/getThread",{
            method: "POST",
            body: JSON.stringify(msgData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        setChats(data.threads);

    },[chats]);
   
    useEffect(() => {
        console.log('Chat pg');
        // load chats
        if(isInitChats) {
          const msgData = {
            user: 1,
            receiver: 2
          }
          getChats(msgData);
          setIsInitChats(false);
        }
    },[])
    
    return (
        <>
        <h1 className="text-center">Chat App</h1>
        <Container className="chats">
        <UserJoined chats={chats}/>
        <ChatForm />
        </Container>
        </>
    );
}

export default Chat;