import React, { useState, useEffect, useRef, useCallback } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../store/chatReducer";
import GroupNav from "../group/GroupNav";
import ChatForm from "./ChatInputForm";
import SocketComp from "../../socketIO.js";
import { socket } from "../../socketIO.js";
import axios from 'axios';

function ChatDetail() {
  const dispatch = useDispatch();
  const groupId = useSelector(state => state.group.groupId);
  const lastMessageId = useSelector(state => state.chat.lastMsgId);
  const userId = useSelector(state => state.auth.userId);
  const userName = useSelector(state => state.auth.userName);
  const [selectedFile, setSelectedFile] = useState(null);

  // console.log(lastMessageId ,'user', userId, groupId, lastMessageId );
  
  const messages = useSelector(state => state.chat.chats);
  // const [messages, setMessages] = useState(messageData);
  // const [sent, setSent] = useState(false);
  const bottomRef = useRef(null);

  const appendMessage2 = (msg) => {
    const message = {
      id: Math.random().toString(),
      message: msg.message,
      userId: msg.userId,
      userName: msg.userName
    };
    dispatch(chatActions.setNewChatsWS(message));
  }

  const submitMsg = useCallback( async (msgData) => {
    const response = await fetch(process.env.REACT_APP_API_URL+"/sendMsg",{
        method: "POST",
        body: JSON.stringify(msgData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // console.log('=>>',msgData)
    const data = await response.json();
    // console.log(data);
    if(data && data.thread === 'success'){
      // fetch chat / update chat again
      // setSent(true);
    }

    const message = {
      id: data.thread.id,
      message: data.thread.message,
      userId: userId,
      userName: userName
    };
    socket.emit('send-chat-message', message);
    dispatch(chatActions.setNewChats([message]));
  },[]);

  const onFileUploadHandler = (selectedFile) => {
    const uploadImgMsg = async (selectedFile) => {
      let formData = new FormData();
      formData.append(
        'file', selectedFile,
      );
      const token = localStorage.getItem('token');
      const sb = {
        userId,
        groupId
      }
      formData.append('imgData', JSON.stringify(sb))
      const URL = process.env.REACT_APP_API_URL+"/imgThread";
      console.log('printing 119:', formData);
      axios.post(
        // Endpoint to send files
        URL,
        formData,
        {
          headers: {
            authorization: token,
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': 'multipart/form-data',
          },
        }       
    )
    .then((res) => {})
    .catch((err) => {});
    }
    if(selectedFile.size < 5000000000 ){
      uploadImgMsg(selectedFile);
    }
  }
    

  const getChats = async (userId, groupId, lastMessageId) => {
    // console.log('getchat called', userId, groupId, lastMessageId);
    const msgData = {
      user: userId,
      groupId,
      lastMessageId: lastMessageId
    }
    // console.log(msgData);
    const response = await fetch(process.env.REACT_APP_API_URL+"/getThread",{
        method: "POST",
        body: JSON.stringify(msgData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    // const tt = new Date();
    // console.log(tt.getMinutes(), tt.getSeconds());
    if(data.threads) {
      dispatch(chatActions.setNewChats(data.threads));
    } else {
      //
    }
    // setSent(false);
    // console.log('Threads =>',data.threads);
  };

  useEffect(() => {
    bottomRef.current.scrollIntoView({
      behavior : "smooth",
    })
  },[messages]);
  

  useEffect(() => { 
    // console.log('gg', groupId)   
    const timer = setTimeout(async () => {
      if(groupId > 0) {
        // console.log('fetching chat =>', userId, groupId, lastMessageId);
        const fetchChats = async () =>{
          await getChats(userId, groupId, lastMessageId);
        }
        fetchChats();
      } else {
        // console.log('useff');
      }
    }, 1000);
    return () => {
      // Cleanup logic here
      // clear old timer bfore setting new timer
      (() => {
        clearTimeout(timer);
      })();
    };
  },[userId, groupId, lastMessageId]);

  useEffect(() => {
    // Setup logic here

    return () => {
      // Cleanup logic here
    };
  }, []); 

  useEffect(() => {
    // Setup logic here
    // console.log('WS =>',userId, userName);
    const message = {
      id: Math.random().toString(),
      message: 'You joined',
      userId: userId,
      userName: userName
    };
    appendMessage2(message);
    socket.emit('new-user', { userId, userName})

    socket.on('chat-message', data => {
      console.log(data.name);
      appendMessage2(data);
    })

    socket.on('user-connected', userName => {
      const message = {
        id: Math.random().toString(),
        message: `${userName} connected`,
        userId: 0,
        userName: ''
      };
      appendMessage2(message);
    })

    socket.on('user-disconnected', userName => {
      const message = {
        id: Math.random().toString(),
        message: `${userName} disconnected`,
        userId: 0,
        userName: ''
      };
      appendMessage2(message);
    })
    return () => {
      // Cleanup logic here
    };
  }, [userId, userName]); 
    
  return (
    <div className="flex flex-col h-screen">
      {/* Group nav  */}
      <GroupNav />
      {/* Messages section  */}
      <div
        className={`bg-[#0a131a] bg-[url('./assets/images/bg.webp')] bg-contain overflow-y-scroll h-100`}
        style={{ padding: "12px 7%" }}
      >
        {messages.map((msg) => {
          return <Message 
            id={Math.random.toString()}
            message={msg.message}
            time={msg.time}
            isLink={msg.isLink}
            userId={msg.userId}
            userName={msg.userName}
            img={msg.img}
          />;
        })}
        <div
          ref={bottomRef}>

        </div>
      </div>
      <SocketComp />
      {/* Bottom section  */}
      <ChatForm messages={messages} onSubmitMsg={submitMsg} onFileUploadHandler={onFileUploadHandler}/>
    </div>
  );
}

export default ChatDetail;
