import React, { createRef, useEffect, useRef, useState } from "react";
import RoundedBtn from "../Common/RoundedBtn";
// import { MdSend } from "react-icons/md";
import { cs2 } from "../../assets/groupchat";
// import { BiHappy } from "react-icons/bi";
// import { AiOutlinePaperClip } from "react-icons/ai";
// import { BsFillMicFill } from "react-icons/bs";
import { getTime } from "../../logic/groupchat";
import { useSelector } from "react-redux";
import { AiOutlinePaperClip, BiHappy, BsFillMicFill, MdSend } from "../UI/Icons/CustomIcons";
import FileUpload from "../UI/FileUpload";
import classes from './ChatInputForm.module.css';

function ChatForm (props) {
  const userId = useSelector(state => state.chat.loggedInUserId);
  const groupId = useSelector(state => state.group.groupId);
  const [typing, setTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileiNPUT = createRef();

  const inputRef = useRef(null);
  const inputFileRef = useRef(null);
  // console.log('ll',loginUserId, receiverList);
  
  const inputChangeHandler = () => {
    inputRef.current.value.length === 0 ? setTyping(false) : setTyping(true);
  };

  const sendMsgHandler = (msg) => {
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
  };

  const onClickEmojiHandler = () => {
    inputRef.current.value += "🔥💯";
    inputRef.current.focus();
  }
  const onClickImgHandler = () => {
    // props.onSubmitMsg({
    //   img: cs2,
    //   time: getTime(),
    //   userId: 1,
    // })
    // const evt = inputFileRef.current.target.click();
    // props.onFileChangeHandler(evt);
  };

  const inputFileChangeHandler = (event) => {
    // event.preventDefault();
    setSelectedFile(event.target.files[0]);
    // setSelectedFile(fileiNPUT.current.value);
    
  }

  useEffect(() => {
    if(selectedFile){
      props.onFileUploadHandler(selectedFile);
    }
  },[selectedFile]);

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
      <span className={`${classes['file-upload']} mr-2`}>
      {/* <RoundedBtn icon={<AiOutlinePaperClip />} onClick={onClickImgHandler} /> */}
        <RoundedBtn icon={<AiOutlinePaperClip />} className="paperclip" />
        <input type="file" multiple="multiple" onChange={inputFileChangeHandler} ref={fileiNPUT}/>
      </span>
      {/* <div>
        <FileUpload />
      </div> */}
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