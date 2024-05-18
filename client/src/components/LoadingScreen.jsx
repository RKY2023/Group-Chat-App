import React, { useEffect, useState } from "react";
import { PiChatsFill  } from "react-icons/pi";
import { FaLock } from "react-icons/fa";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useDispatch, useSelector } from "react-redux";
import { groupActions } from "../store/groupReducer";
import { chatActions } from "../store/chatReducer";

function LoadingScreen (props) {
  const dispatch = useDispatch();
  const groupId = useSelector(state => state.group.groupId);
  const lastMessageId = useSelector(state => state.chat.lastMsgId);
  const userId = useSelector(state => state.chat.loggedInUserId);
  const isInit = useSelector(state => state.chat.isInit);
  const [error, setError] = useState('');
  console.log(lastMessageId ,'user', userId, groupId, lastMessageId );

  const getGroupList = async () => {
    const response = await fetch("http://localhost:5000/groupList",{
      method: "GET",
      headers: {
          'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    // console.log(data);
    if(data && data.message === 'success'){
      if(data.groups.length === 0) {
        dispatch(groupActions.setIsNewGroupRequired(true));
      } else {
        dispatch(groupActions.setGroupList(data.groups));
        dispatch(groupActions.setGroupId(data.groups[0].id));
        // dispatch(groupActions.setCurrentGroup(data.groups[0].id));
        
      }
    } else {
      setError('Error in fetching groups');
    }
  };

  useEffect(() => {
    getGroupList();
  });

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
      setError(data.error);
    }
    console.log('Threads =>',data.threads);
  };

  // useEffect(() => {
  //   if(groupId > 0) {
  //     setError('');
  //     (async () => {
  //       console.log('fetching chat[Load] =>', userId, groupId, lastMessageId);
  //       await getChats(userId, groupId, lastMessageId);
  //     })();
  //   } else {
  //     setError('Group id is Invalid');
  //   }
  // },[userId, groupId, lastMessageId]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-[#202d33]">
      {/* Icon  */}
      <span className="text-[#3d464a] text-6xl my-12">
        <PiChatsFill  />

      </span>
      <div className="flex flex-col justify-evenly items-center h-[150px]">
        {/* Progress bar  */}
        <ProgressBar variant="success" now={props.progress} className="bg-[#243138]  rounded-lg w-[320px] h-[3px]"/>
        {/* Name  */}
        <div className="flex flex-col items-center">
          <h1 className="text-[#c1c6c9] text-lg font-medium">
            GroupChatApp
          </h1>
          {/* lock & encryped  */}
          <div className="flex items-center text-[#687782]">
            <span className="text-sm mr-3">
              <FaLock />
            </span>
            <p>End-to-End encrypted</p>
            <p className="flex word-break ml-3">{error}</p>
          </div>
        </div>
        

      </div>
    </div>
  );
};

export default LoadingScreen;