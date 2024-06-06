import React from 'react';
import RoundedBtn from "../../Common/RoundedBtn";
// import { BiEditAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { BiEditAlt, FaUserGroup } from '../../UI/Icons/CustomIcons';
// import { FaUserGroup } from "react-icons/fa6";

function GroupProfile() {
  const groupMembers = useSelector(state => state.group.groupMembers);
  return (
    <div className="flex flex-col justify-between items-center bg-{#202d33] h-[300px] p-3 text-white">
      <div className="flex justify-center items-center rounded-full p-5 bg-[#45454430]">
      {/* <img src={pp} alt="profile_picture" className="rounded-full w-[40px]" /> */}
        
      <RoundedBtn icon={<FaUserGroup />}/>
      </div>
      <div className="flex justify-between items-center">
        <span>
          Group Name
        </span>
        <RoundedBtn icon={<BiEditAlt />} />
      </div>
      <div className="flex justify-between items-center">
        <span>
          Group | {groupMembers.length} members
        </span>
      </div>
      <div className="flex justify-between items-center">
        {/* <div className='text-xs p-2 bg-[#ff000099] rounded-md border-[#fff]'>
          Add/Remove Members
        </div> */}
      </div>
    </div>
  )
}

export default GroupProfile