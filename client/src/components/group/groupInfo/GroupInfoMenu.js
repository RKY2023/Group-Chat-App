import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupActions } from "../../../store/groupReducer";
import GroupMembers from "./GroupMembers";
import GroupProfile from "./GroupProfile";
import AddMemberToGroup from "./AddMemberToGroup";

function GroupInfoMenu() {
  const dispatch = useDispatch();
  const groupId = useSelector(state => state.group.groupId);
  const api_url = useSelector(state => state.ui.api_url);
  const [isShownAddMemberToGroup, setIsShownAddMemberToGroup] = useState(false);

  const groupInfo = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(api_url+"/groupInfo", {
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
    if (data && data.status === "success") {
      dispatch(groupActions.setGroupMembersList(data.usergroups));
    }
  };

  const toggleisShownAddMemberToGroup = () => {
    setIsShownAddMemberToGroup(!isShownAddMemberToGroup);
  }

  useEffect(() => {
    console.log('groupInfo =>');
    groupInfo();
  });

  return (
    <div className="flex flex-col border-r border-neutral-700 w-100 h-screen">
      {!isShownAddMemberToGroup && <>
      <GroupProfile toggleShow={toggleisShownAddMemberToGroup} />
      <GroupMembers />      
      </>}
      {isShownAddMemberToGroup && 
      <AddMemberToGroup toggleShow={toggleisShownAddMemberToGroup}/>
      }
    </div>
  );
}

export default GroupInfoMenu;
