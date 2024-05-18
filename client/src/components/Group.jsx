import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { groupActions } from "../store/groupReducer";
import { chatActions } from "../store/chatReducer";

function Group(props) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const setGroupHandler = (event) => {
    
    dispatch(groupActions.setGroupId(props.id));
    dispatch(groupActions.setCurrentGroup({gp: props.gp, title: props.title, info: props.info}));
    dispatch(chatActions.setNewGroupChats());
  }

  return (
    <div onClick={setGroupHandler}
      className={`flex justify-between items-center cursor-pointer w-100 h-[85px] px-3 hover:bg-[#202d33] ${
        props.active ? "bg-[#202d33]" : ""
      }`}
    >
      {/* Image  */}
      <img
        src={props.gp}
        alt={"profile_picture"}
        className="rounded-full w-[50px] mr-5"
      />
      {/* Info container  */}
      <div className="flex justify-between border-t border-neutral-700 w-100 h-100 py-3">
        {/* Username and Message  */}
        <div className="flex flex-col justify-between text-white">
          {/* Username  */}
          <h1 className="font-medium mb-1">{props.title}</h1>
          {/* Message */}
          <p
            className={`text-sm ${!props.unreadMsgs ? "text-neutral-400" : ""}`}
          >
            {props.info}
          </p>
        </div>
        {/* Timestamp and unread messages */}
        <div className="flex flex-col justify-between items-end h-100 text-xs">
          {/* Time  */}
          <div className="text-emerald-500 min-w-[55px]">{props.time}</div>
          {/* unread messages  */}
          {props.unreadMsgs && 
          <div className="flex justify-center items-center bg-emerald-500 rounded-full w-[20px] h-[20px]">
            <p className="text-emerald-900">{props.unreadMsgs}</p>
          </div>
          }
        </div>
      </div>
      
    </div>
  );
}

export default Group;
