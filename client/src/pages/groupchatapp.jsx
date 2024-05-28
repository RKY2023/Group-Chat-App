import React, { useEffect, useState } from "react";
import LeftMenu from "../components/LeftMenu";
import ChatDetail from "../components/chat/ChatDetail";
import LoadingScreen from "../components/LoadingScreen";
import { useSelector } from "react-redux";

// TODO: loading screen component

function GroupChatsApp () {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  const groupId = useSelector(state => state.group.groupId);

  useEffect(() => {
    const tm1 = setTimeout(() => {
      if (progress >= 100) {
        setLoading(false);
      } else {
        const increment = Math.floor(Math.random() * (10 + 1)) + 8;
        setProgress(progress + increment);
      }
    },300);
    return () => clearTimeout(tm1);
  },[progress])
  return (
  <>
  {loading ? (<LoadingScreen progress={progress}/>
  ) : (
  <div className="w-screen h-screen overflow-hidden">
    <div className="flex justify-start groupchat-bp:justify-center items-center bg-[#111a21] h-screen">
      <div className="bg-[#111a21] min-w-[340px] max-w-[500px] w-100 h-100">
        <LeftMenu />
      </div>
      <div className="bg-[#222f35] min-w-[415px] max-w-[1120px] w-100 h-100">
        {groupId === 0 && <ChatDetail />}
      </div>
      {/* <div className="bg-[#111a21] min-w-[340px] max-w-[500px] w-100 h-100">
        <RightMenu />
      </div> */}
    </div>
  </div>
  )}
  </>
 ); 
};

export default GroupChatsApp;