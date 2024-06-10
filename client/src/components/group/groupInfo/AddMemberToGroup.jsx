import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "../../UI/Icons/CustomIcons";
import { pp } from "../../../assets/groupchat";
import CardList from "../../Common/CardList";
import { authActions } from '../../../store/authReducer';

function AddMemberToGroup(props) {
  const dispatch = useDispatch();
  const [searchUser, setSearchUser] = useState('');
  const [isMemberModified, setIsMemberModified] = useState(false);
  const users = useSelector(state => state.auth.users);
  const api_url = useSelector(state => state.ui.api_url);
  const groupId = useSelector(state => state.group.groupId);


  const toggleShowHandler = () => {
    props.toggleShow();
    console.log(users)
  }

  const onChangeSearch = (event) => {
    setSearchUser(event.target.value);
  }
  // call api search
  const searchUserAndUserGroup = async() => {
    const token = localStorage.getItem("token");
    const response = await fetch(api_url+"/searchUserAndUserGroup", {
      method: "POST",
      body: JSON.stringify({
        search: searchUser,
        groupId
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();
    console.log(data);
    if (data && data.message === "success") {
      dispatch(authActions.setUsers(data.users));
    }
  };
  // call add remove Group memeber api
  const modifyGroupMember = async(method) => {
    console.log('method', method);
    const token = localStorage.getItem("token");
    const response = await fetch(api_url+"/addUserGroup", {
      method: "POST",
      body: JSON.stringify({
        type : method.type,
        userId: method.userId, 
        groupId
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();
    console.log(data);
    if (data && data.message === "success") {
      dispatch(authActions.setUsers(data.users));
      setIsMemberModified(true);
    }
  };

  // use effect to reacall api on search 
  useEffect(() => {
    const timer1 = setTimeout( () => {
      setIsMemberModified(false);
      searchUserAndUserGroup();
    }, 700);

    return (() => {
      clearTimeout(timer1);
    })
  },[searchUser, isMemberModified]);



  return (
    <div className="flex flex-col overflow-y-scroll cursor-pointer h-100">
      {/* New Group  */}
      <div className="flex justify-between items-center w-100 h-[50px]" onClick={toggleShowHandler}>
        <div className="flex mx-3 text-white">
          {/* icon  */}
          <FaArrowLeft />
        </div>
        <div className="flex text-md mr-auto p-1 text-white font-medium">
          Search user to add
        </div>
      </div>
      <div className="flex justify-between items-center w-100 h-[85px] text-white px-2">
        <input
          type="text"
          placeholder="Type group name, email, phoneno"
          className="w-100 rounded-lg bg-[#202d33] text-[#8796a1] text-sm font-light outline-none px-4 py-2 h-[35px] placeholder:text-[#8796a1] placeholder:text-sm placeholder:font-light"
          // ref={inputSearchRef}
          onChange={onChangeSearch}
        />
      </div>
      {/* members list */}
      <div className="flex flex-col text-white">
        
        {users.map((user, i) => {
          return (
            <CardList
              elem-type='membersearch'
              id={user.id}
              gp={pp}
              title={user.name}
              time={user.updatedAt}
              info={user.info}
              unreadMsgs={user.unreadMsgs}
              onInvite={''}
              modifyGroupMember={modifyGroupMember}
              isMember={user.isMember}
            />
          );
        })}
      </div>
    </div>
  )
}

export default AddMemberToGroup