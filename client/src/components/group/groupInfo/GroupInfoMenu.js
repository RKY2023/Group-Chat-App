import React, { useEffect, useState } from "react";
import RoundedBtn from "../../Common/RoundedBtn";
import { BiEditAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { FaUserGroup } from "react-icons/fa6";
import { grf1 } from "../../../assets/groupchat";
import CardList from "../../Common/CardList";

function GroupInfoMenu() {
  const groupMembers = useSelector(state => state.group.groupMembers);
  const groupId = useSelector(state => state.group.groupId);

  const groupInfo = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/groupInfo", {
      method: "POST",
      body: JSON.stringify({
        groupId: groupId
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();
    console.log(data);
    if (data && data.message === "success") {
      // setUsers(data.users);
    }
  };

  useEffect(() => {
    console.log('groupInfo =>');
    groupInfo();
  });

  return (
    <div className="flex flex-col border-r border-neutral-700 w-100 h-screen">
      <div className="flex flex-col justify-between items-center bg-{#202d33] h-[200px] p-3 text-white">
        <div className="flex justify-center items-center rounded-full p-5 bg-[#45454430]">
        {/* <img src={pp} alt="profile_picture" className="rounded-full w-[40px]" /> */}
         
        <RoundedBtn icon={<FaUserGroup />}/>
        </div>
        <div className="flex justify-between">
          <span>
            Group Name
          </span>
          <RoundedBtn icon={<BiEditAlt />} />
        </div>
        <div className="flex justify-between">
          <span>
            Group | 2 members
          </span>
        </div>
      </div>
      {groupMembers.map((group, i) => {
        return (
          <CardList
            elem-type={'groupMembers'}
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

export default GroupInfoMenu;
