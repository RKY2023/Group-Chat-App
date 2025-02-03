import React, { useEffect, useRef, useCallback } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../store/chatReducer";
import GroupNav from "../group/GroupNav";
import ChatForm from "./ChatInputForm";

function ChatDetail() {
  const dispatch = useDispatch();
  const api_url = useSelector(state => state.ui.api_url);
  const groupId = useSelector(state => state.group.groupId);
  const lastMessageId = useSelector(state => state.chat.lastMsgId);
  const userId = useSelector(state => state.chat.loggedInUserId);
  
  const messages = useSelector(state => state.chat.chats);
  // const [messages, setMessages] = useState(messageData);
  // const [sent, setSent] = useState(false);
  const bottomRef = useRef(null);

  const submitMsg = useCallback( async (msgData) => {
    const response = await fetch(api_url+"/sendMsg",{
        method: "POST",
        body: JSON.stringify(msgData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    const data = await response.json();
    if(data && data.thread === 'success'){
      // fetch chat / update chat again
      // setSent(true);
    }
  },[api_url]);

  const getChats = useCallback(async (userId, groupId, lastMessageId) => {
    const msgData = {
      user: userId,
      groupId,
      lastMessageId: lastMessageId
    }

    const response = await fetch(api_url+"/getThread",{
        method: "POST",
        body: JSON.stringify(msgData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    // const tt = new Date();
    if(data.threads) {
      dispatch(chatActions.setNewChats(data.threads));
    } else {
      //
    }
    // setSent(false);
  },[api_url, dispatch]);

  useEffect(() => {
    bottomRef.current.scrollIntoView({
      behavior : "smooth",
    })
  },[messages]);
  

  useEffect(() => { 
    const timer = setInterval(async () => {
      if(groupId > 0) {
        await getChats(userId, groupId, lastMessageId);
      } else {
      }
    }, 1000);
    return () => {
      // Cleanup logic here
      // clear old timer bfore setting new timer
      (() => {
        clearInterval(timer);
      })();
    };
  },[userId, groupId, lastMessageId, getChats]);

  useEffect(() => {
    // Setup logic here

    return () => {
      // Cleanup logic here
    };
  }, []); 
    
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
            message={msg.message}
            time={msg.time}
            isLink={msg.isLink}
            userId={msg.userId}
            img={msg.img}
          />;
        })}
        <div
          ref={bottomRef}>

        </div>
      </div>

      {/* Bottom section  */}
      <ChatForm messages={messages} onSubmitMsg={submitMsg}/>
    </div>
  );
}

export default ChatDetail;
