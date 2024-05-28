import React from 'react';
import RoundedBtn from "../Common/RoundedBtn";
// import { MdPeopleAlt } from "react-icons/md";
// import { TbCircleDashed } from "react-icons/tb";
// import { BsFillChatLeftTextFill } from "react-icons/bs";
// import { HiDotsVertical } from "react-icons/hi";
import { pp } from "../../assets/groupchat";
import { BsFillChatLeftTextFill, HiDotsVertical, MdPeopleAlt, TbCircleDashed } from './Icons/CustomIcons';

function UserNav() {
  return (
    <div className="flex justify-between items-center bg-{#202d33] h-[60px] p-3">
      <img src={pp} alt="profile_picture" className="rounded-full w-[40px]" />
      <div className="flex justify-between w-[175px]">
        <RoundedBtn icon={<MdPeopleAlt />} />
        {/* <RoundedBtn icon={<TbCircleDashed />} /> */}
        <RoundedBtn icon={<TbCircleDashed />} />
        <RoundedBtn icon={<BsFillChatLeftTextFill />} />
        <RoundedBtn icon={<HiDotsVertical />} />
      </div>
    </div>
  )
}

export default UserNav;