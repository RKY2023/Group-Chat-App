import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupActions } from "../../../store/groupReducer";
import GroupMembers from "./GroupMembers";
import GroupProfile from "./GroupProfile";

function GroupInfoMenu() {
  const dispatch = useDispatch();
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
    if (data && data.status === "success") {
      dispatch(groupActions.setGroupMembersList(data.usergroups));
    }
  };

  useEffect(() => {
    console.log('groupInfo =>');
    groupInfo();
  });

  return (
    <div className="flex flex-col border-r border-neutral-700 w-100 h-screen">
      <GroupProfile />
      <GroupMembers />      
    </div>
  );
}

export default GroupInfoMenu;
