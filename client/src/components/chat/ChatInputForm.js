import React, { useCallback, useEffect, useRef, useState } from "react";
import RoundedBtn from "../Common/RoundedBtn";
import { MdSend } from "react-icons/md";
import { cs2 } from "../../assets/groupchat";
import { BiHappy } from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { getTime } from "../../logic/groupchat";
import { useSelector } from "react-redux";

function ChatForm (props) {
  const userId = useSelector(state => state.chat.loggedInUserId);
  const groupId = useSelector(state => state.group.groupId);
  const [typing, setTyping] = useState(false);

  const inputRef = useRef(null);
  
  const inputChangeHandler = () => {
    inputRef.current.value.length === 0 ? setTyping(false) : setTyping(true);
  };

  const sendMsgHandler = useCallback((msg) => {
    if(inputRef.current.value.length > 0) {
      const msgData= {
        message: inputRef.current.value,
        time: getTime(),
        groupId: groupId,
        userId,
      }
      // api call
      props.onSubmitMsg(msgData);
      inputRef.current.value = "";
      inputRef.current.focus();
      setTyping(false);
    } else {
      // for imag submit
    }
  },[groupId, props, userId]);

  const onClickEmojiHandler = () => {
    inputRef.current.value += "🔥💯";
    inputRef.current.focus();
  }
  const onClickImgHandler = () => {
    props.onSubmitMsg({
      img: cs2,
      time: getTime(),
      userId: 1,
    })
  };

  useEffect(() => {
    const listener = (e) => {
      if(e.code === "Enter") 
        sendMsgHandler();
    }

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  },[props.messages,sendMsgHandler]);

  return (
    <>
    <div className="flex items-center bg-[#202d33] w-100 h-[70px] p-2">
      {/* Emoji Btn  */}
      <RoundedBtn icon={<BiHappy />} onClick={onClickEmojiHandler}/>
      {/* Upload Btn  */}
      <span className="mr-2">
        <RoundedBtn icon={<AiOutlinePaperClip />} onClick={onClickImgHandler}/>
      </span>
      {/* Input Btn  */}
      <input
        type="text"
        placeholder="Type a message"
        className="bg-[#2c3943] rounded-lg outline-none text-sm text-neutral-200 w-100 h-100 px-3 placeholder:text-sm placeholder:text-[#8796a1]"
        ref={inputRef}
        onChange={inputChangeHandler}
      />
      {/* Mic/Send Btn  */}
      <span className="ml-2">
        {!typing && <RoundedBtn icon={<BsFillMicFill />} onClick={sendMsgHandler} />}
        {typing && <RoundedBtn icon={<MdSend />} onClick={sendMsgHandler} />}
      </span>
    </div>
    </>
  );
};

export default ChatForm;