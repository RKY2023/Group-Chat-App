import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupActions } from "../../store/groupReducer";
import { chatActions } from "../../store/chatReducer";
import { useHistory } from "react-router-dom";

function CardList(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const api_url = useSelector(state => state.ui.api_url);
  // const groupId = useSelector(state => state.group.groupId);
  // const userId = useSelector(state => state.chat.loggedInUserId);
  // const [active, setActive] = useState(false);
  const setGroupHandler = (event) => {
    dispatch(groupActions.setGroupId(props.id));
    dispatch(groupActions.setCurrentGroup({gp: props.gp, title: props.title, info: props.info, activeGroupIndex: props.activeGroupIndex}));
    dispatch(chatActions.setNewGroupChats());
  }
  // console.log(props['elem-type']);
  // removeGroupAdminApi
  const changeGroupAdmin = async (type) => {
    if(type !== 'add' && type !== 'remove')
      return;
    let api_path = '/removeAdmin';
    if(type === 'add')
      api_path = '/addAdmin';
    console.log('remove api', props);
    const token = localStorage.getItem("token");
    const response = await fetch(api_url+api_path, {
      method: "POST",
      body: JSON.stringify({
        ChangeAdminUserId: props.userid,
        ChangeAdminGroupId: props.groupid,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();
    console.log(data);
    if (data && data.message === "success") {
      // dispatch(chatActions.setNewCreatedGroup(data.group));
      // // dispatch(uiActions.toggleModal());
      // dispatch(groupActions.addGroup(data.group));
      history.replace('/group');
    }
  };

  const removeGroupAdmin = () => {
    console.log('remove',props);
    changeGroupAdmin('remove');
  }

  const addGroupAdmin = () => {
    console.log('add', props);
    changeGroupAdmin('add');
  }

  const onClickDiv = (event) =>{
    if(props['elem-type'] === 'groupMembers' || props['elem-type'] === 'membersearch') {
      console.log('here');
      // return;
    } else {
      setGroupHandler(event);
    }
  }
  const onAddGroupMember = () => {
    props.modifyGroupMember({type : 'add', userId : props.id});
  }
  const onRemoveGroupMember = () => {
    props.modifyGroupMember({type : 'remove', userId : props.id});
  }

  return (
    <>
    <div onClick={onClickDiv}
      className={`flex justify-between items-center cursor-pointer w-100 h-[85px] px-3 hover:bg-[#202d33] ${
        props.active ? "bg-[#202d33]" : ""
      }`}
    >
      {/* Image  */}
      <img
        src={props.gp}
        alt={"profile_picture"}
        className="rounded-full w-[50px] mr-5"
      />
      {/* Info container  */}
      <div className="flex justify-between border-t border-neutral-700 w-100 h-100 py-3">
        {/* Username and Message  */}
        <div className="flex flex-col justify-between text-white">
          {/* Username  */}
          {props['elem-type'] === 'groupMembers' &&
          <h1 className="font-medium mb-1">{props.name}</h1>
          }
          {props['elem-type'] === 'group' &&
          <h1 className="font-medium mb-1">{props.title}</h1>
          }
          {props['elem-type'] === 'membersearch' &&
          <h1 className="font-medium mb-1">{props.title}</h1>
          }
          {/* Group Info / Group Admin */}
          {props['elem-type'] === 'groupMembers' && props.isAdmin &&
          <p
            className='text-xs bg-[#ff000040] rounded-md px-2 py-1'
          >
            Admin
          </p>
          }
          {props['elem-type'] === 'group' && 
          <p
            className={`text-sm ${!props.unreadMsgs ? "text-neutral-400" : ""}`}
          >
            {props.info}
          </p>
          }
        </div>
        {/* Timestamp and unread messages */}
        {props['elem-type'] === 'group' &&
        <div className="flex flex-col justify-between items-end h-100 text-xs">
          {/* Time  */}
          <div className="text-emerald-500 min-w-[55px]">{props.time}</div>
          {/* unread messages  */}
          {props.unreadMsgs && 
          <div className="flex justify-center items-center bg-emerald-500 rounded-full w-[20px] h-[20px]">
            <p className="text-emerald-900">{props.unreadMsgs}</p>
          </div>
          }
        </div>
        }
        {/* Group Admin add / remove */}
        {props['elem-type'] === 'groupMembers' &&
        <div className="flex flex-col justify-between items-end h-100 text-xs">
          {/* add/ remmove  */}
          <div className="text-emerald-500 min-w-[55px]">
            {props.isAdmin && 
            <div onClick={removeGroupAdmin}>Remove</div>
            }
            {!props.isAdmin && 
            <div onClick={addGroupAdmin}>Add</div>
            }
          </div>
        </div>
        }
        {/* Add member button */}
        {props['elem-type'] === 'membersearch' &&
          <>
          {!props.isMember && 
          <div onClick={onAddGroupMember}>Add</div>
          }
          {props.isMember && 
          <div onClick={onRemoveGroupMember}>Remove</div>
          }
          </>
        }
      </div>
      
    </div>
    </>
  );
}

export default CardList;
