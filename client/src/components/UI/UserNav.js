import React from 'react';
import RoundedBtn from "../Common/RoundedBtn";
// import { MdPeopleAlt } from "react-icons/md";
// import { TbCircleDashed } from "react-icons/tb";
// import { BsFillChatLeftTextFill } from "react-icons/bs";
// import { HiDotsVertical } from "react-icons/hi";
// import { HiUserCircle } from "react-icons/hi2";
import { pp } from "../../assets/groupchat";
import { BsFillChatLeftTextFill, HiDotsVertical, HiUserCircle, MdPeopleAlt, TbCircleDashed } from './Icons/CustomIcons';

function UserNav() {
  return (
    <div className="flex justify-between items-center bg-{#202d33] h-[60px] p-3">
        <div className='text-[#8796a1] text-3xl p-1 rounded-full hover:bg-[#3c45c1]'>
          <HiUserCircle />
        </div>
      {/* <img src={pp} alt="profile_picture" className="rounded-full w-[40px]" /> */}
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