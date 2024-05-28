import React, { useState } from "react";
// import { BiFilter } from "react-icons/bi";
import { BiFilter } from "./UI/Icons/CustomIcons";
import Groups from "./group/Groups";
import NewGroupMenu from "./group/NewGroupMenu";
import { useSelector } from "react-redux";
import UserNav from "./UI/UserNav";
import GroupInfoMenu from "./group/groupInfo/GroupInfoMenu";

function LeftMenu() {
  const createGroupDiv = useSelector(state => state.ui.isCreateGroupShown);
  const infoGroupDiv = useSelector(state => state.ui.isGroupInfoShown);
  // toggleCreateGroup
  const [filter, setFilter] = useState(false);

  const onClickHandler = () => {
    setFilter(!filter);
  };
  return (
    <div className="flex flex-col border-r border-neutral-700 w-100 h-screen">
      <UserNav />
      {!createGroupDiv && !infoGroupDiv && 
      <>
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
      <Groups filter={filter} />
      </>
      }
      {createGroupDiv && 
      <NewGroupMenu />
      }
      {infoGroupDiv && 
      <GroupInfoMenu />
      }

    </div>
  );
}

export default LeftMenu;
