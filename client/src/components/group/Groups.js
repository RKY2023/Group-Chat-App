import React, { useEffect, useState } from "react";
import { chatsData } from "../../data/GroupChat";
import { MdOutlineGroupAdd  } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { grf1 } from "../../assets/groupchat";
import { uiActions } from "../../store/uiReducer";
import CardList from "../Common/CardList";

function Groups(props) {
  const dispatch = useDispatch();
  const [chats, setChats] = useState(chatsData);
  const groupsData = useSelector(state => state.group.groups);
  const [groups, setGroups] = useState(groupsData);
 
  const toggleCreateGroupHandler = () => {
    dispatch(uiActions.toggleCreateGroup());
  }

  useEffect(() => {
    const newChats = props.filter ? chatsData.filter((chat) => chat.unreadMsgs) : chatsData;
    setChats(newChats);
    
    console.log('Group data',groupsData);
  }, [props.filter]);
  return (
    <div className="flex flex-col overflow-y-scroll cursor-pointer h-100">
      <div className="flex justify-between items-center w-100 min-h-[55px] px-3 hover:bg-[#202d33]">
        <div className="flex justify-around items-center w-[150px]" onClick={toggleCreateGroupHandler}>
          {/* <span className="text-emerald-500 text-lg">
            <ImFolderDownload />
          </span>
          <h1 className="text-white">Archived</h1> */}
          <span className="text-emerald-500 text-lg">
            <MdOutlineGroupAdd  />
          </span>
          <h1 className="text-white">New Group</h1>
        </div>
        <p className="text-emerald-500 text-xs font-light"></p>
      </div>
      {groupsData.map((group, i) => {
        return (
          <CardList
            elem-type={'group'}
            id={group.id}
            gp={grf1}
            title={group.title}
            time={group.updatedAt}
            info={group.info}
            unreadMsgs={group.unreadMsgs}
            active={i === 0}
          />
        );
      })}
    </div>
  );
}

export default Groups;
