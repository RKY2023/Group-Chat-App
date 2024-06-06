import React, { useRef, useState, useEffect } from "react";
// import { FaArrowLeft } from "react-icons/fa";
import { FaArrowLeft } from "../UI/Icons/CustomIcons";
import { useDispatch, useSelector } from "react-redux";
import { pp } from "../../assets/groupchat";
import { chatActions } from "../../store/chatReducer";
import { groupActions } from "../../store/groupReducer";
import { uiActions } from "../../store/uiReducer";
import AddGroupMember from "./AddGroupMember";
import { useHistory } from "react-router-dom";


function NewGroupMenu() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [apiNotCalled, setApiNotCalled] = useState(true);
  const dispatch = useDispatch();
  const api_url = useSelector(state => state.ui.api_url);

  const inputGroupNameRef = useRef();
  const inputGroupMembersRef = useRef();
  
  const toggleCreateGroupHandler = () => {
    dispatch(uiActions.toggleCreateGroup());
  }

  const inviteHandler = (addRef) => {
    console.log(addRef);
    const newInvitedUser = addRef.dataset.key;
    if (addRef.value === "Add") {
      setInvitedUsers([...invitedUsers, newInvitedUser]);
      addRef.value = "Added";
      inputGroupMembersRef.current.value += addRef.dataset.name + ',';
    } else {
      // remove invited users
      addRef.value = "Add";
    }
  };

  const userListApi = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(api_url+"/userList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();
    console.log(data);
    if (data && data.message === "success") {
      setUsers(data.users);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch(api_url+"/newGroup", {
      method: "POST",
      body: JSON.stringify({
        title: inputGroupNameRef.current.value,
        invites: invitedUsers,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();
    console.log(data);
    if (data && data.message === "success") {
      dispatch(chatActions.setNewCreatedGroup(data.group));
      // dispatch(uiActions.toggleModal());
      dispatch(groupActions.addGroup(data.group));
      toggleCreateGroupHandler();
      history.replace('/group');
    }
  };

  useEffect(() => {
    if (apiNotCalled) {
      userListApi();
      setApiNotCalled(false);
    }
  }, [apiNotCalled, userListApi, setApiNotCalled]);

  return (
    <div className="flex flex-col overflow-y-scroll cursor-pointer h-100">
      {/* New Group  */}
      <div className="flex justify-between items-center w-100 h-[50px]" onClick={toggleCreateGroupHandler}>
        <div className="flex mx-3 text-white">
          {/* icon  */}
          <FaArrowLeft />
        </div>
        <div className="flex text-md mr-auto p-1 text-white font-medium">
          New Group
        </div>
      </div>
      <div className="flex justify-between items-center w-100 h-[85px] text-white px-2">
        <input
          type="text"
          placeholder="Type Group Name"
          className="w-100 rounded-lg bg-[#202d33] text-[#8796a1] text-sm font-light outline-none px-4 py-2 h-[35px] placeholder:text-[#8796a1] placeholder:text-sm placeholder:font-light"
          ref={inputGroupNameRef}
        />
      </div>
      {/* Add group member  */}
      <div className="flex justify-between items-center w-100 h-[50px]">
        <div className="flex mx-3 text-white">
          {/* icon  */}
          {/* <FaArrowLeft /> */}
        </div>
        <div className="flex text-md mr-auto p-1 text-white font-medium">
          Add group members
        </div>
      </div>
      {/* Group member List */}
      <div className="flex justify-between items-center w-100 h-[50px]">
        <input disabled type="textarea" className="flex w-100 rounded-md bg-[#445566] text-white m-2 px-2 py-1" ref={inputGroupMembersRef} />
      </div>
      {/* Search bar  */}
      {/* members list */}
      <div className="flex flex-col text-white">
        {users.map((user, i) => {
          return (
            <AddGroupMember
              id={user.id}
              gp={pp}
              title={user.name}
              time={user.updatedAt}
              info={user.info}
              unreadMsgs={user.unreadMsgs}
              active={i === 0}
              onInvite={inviteHandler}
            />
          );
        })}
      </div>
      <div className="flex justify-center items-center mt-2">
        <button
          type="submit"
          className="flex text-white bg-[#445566] rounded-md text-sm py-1 px-2"
          onClick={submitHandler}
        >
          Create Group
        </button>
      </div>
    </div>
  );
}

export default NewGroupMenu;
