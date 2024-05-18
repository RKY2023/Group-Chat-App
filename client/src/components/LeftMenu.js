import React, { useState } from "react";
import RoundedBtn from "./Common/RoundedBtn";
import { MdPeopleAlt } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { BiFilter } from "react-icons/bi";
import { pp } from "../assets/groupchat";
import Groups from "./Groups";
import AddGroupMember from "./addGroupMember";
import { useSelector } from "react-redux";

function LeftMenu() {
  const createGroupDiv = useSelector(state => state.ui.isCreateGroupShown);
  // toggleCreateGroup
  const [filter, setFilter] = useState(false);

  const onClickHandler = () => {
    setFilter(!filter);
  };
  return (
    <div className="flex flex-col border-r border-neutral-700 w-100 h-screen">
      <div className="flex justify-between items-center bg-{#202d33] h-[60px] p-3">
        <img src={pp} alt="profile_picture" className="rounded-full w-[40px]" />
        <div className="flex justify-between w-[175px]">
          <RoundedBtn icon={<MdPeopleAlt />} />
          <RoundedBtn icon={<TbCircleDashed />} />
          <RoundedBtn icon={<BsFillChatLeftTextFill />} />
          <RoundedBtn icon={<HiDotsVertical />} />
        </div>
      </div>
      <div className="flex justify-between items-center h-[60px] p-2">
        <input
          type="text"
          placeholder="Search or start a new Group"
          className="w-100 rounded-lg bg-[#202d33] text-[#8796a1] text-sm font-light outline-none px-4 py-2 h-[35px] placeholder:text-[#8796a1] placeholder:text-sm placeholder:font-light"
        />
        <button
          className={`text-2xl m-2 p-1 rounded-full ${filter ? "bg-emerald-500 text-white rounded-full hover:bg-emerald-700": "text-[#8796a1] bg-[#3c454c]"}`}
          onClick={onClickHandler}
        >
          <BiFilter />
        </button>
      </div>
      {!createGroupDiv && 
      <Groups filter={filter} />
      }
      {createGroupDiv && 
      <AddGroupMember />
      }
      

    </div>
  );
}

export default LeftMenu;
