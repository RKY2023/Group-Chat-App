import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupActions } from "../../../store/groupReducer";
import GroupMembers from "./GroupMembers";
import GroupProfile from "./GroupProfile";

function GroupInfoMenu() {
  const dispatch = useDispatch();
  const groupId = useSelector(state => state.group.groupId);
  const api_url = `${process.env.REACT_APP_API_URL}/groupInfo`;

  const getGroupInfo = useCallback(async () => {
    const response = await fetch(api_url, {
      method: "POST",
      body: JSON.stringify({ groupId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    let data = await response.json();  
    if (data && data.status === "success") {
      dispatch(groupActions.setGroupMembersList(data.usergroups));
    }    
  }, [api_url, dispatch, groupId]);

  useEffect(() => {
    getGroupInfo();
  }, [getGroupInfo]);

  return (
    <div className="flex flex-col border-r border-neutral-700 w-100 h-screen">
      <GroupProfile />
      <GroupMembers />
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>} */}
    </div>
  );
}

export default GroupInfoMenu;
