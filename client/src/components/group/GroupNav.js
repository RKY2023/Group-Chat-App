import React from "react";
import RoundedBtn from "../Common/RoundedBtn";
import { messagesData } from "../../data/GroupChat";
import { MdOutlineInfo, MdSearch } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { cs1 } from "../../assets/groupchat";
import { useDispatch, useSelector } from "react-redux";
import DropdownMenu from "../UI/dropdown";
import { uiActions } from "../../store/uiReducer";

function GroupNav (props) {
  const dispatch = useDispatch();
  const groupId = useSelector(state => state.group.groupId);
  const name = useSelector(state => state.group.currentGroupName);
  const info = useSelector(state => state.group.currentGroupInfo);
  const img = useSelector(state => state.group.currentGroupImg);

  const toggleInfoGroupHandler = () => {
    dispatch(uiActions.toggleInfoGroup());
  }

  return (
    <>
    <div className="flex justify-between bg-[#202d33] h-[60px] p-3">
      {/* Contact info  */}
      <div className="flex items-center">
        {/* Profile picture  */}
        <img
          src={img}
          alt="profile_picture"
          className="rounded-full w-[45px] h-[45px] mr-5"
        ></img>
        {/* Info  */}
        <div className="flex flex-col">
          {/* Contact  */}
          <h1 className="text-white font-medium">{name}</h1>
          {/* Status  */}
          <p className="text-[#8796a1] text-xs">{info}</p>
        </div>
      </div>
      {/* Button   */}
      <div className="flex justify-between items-center">
        <RoundedBtn icon={<MdSearch />} />
        <RoundedBtn icon={<MdOutlineInfo />} onClick={toggleInfoGroupHandler} />
        {/* <DropdownMenu /> */}
      </div>
    </div>
    </>
  );
};

export default GroupNav;