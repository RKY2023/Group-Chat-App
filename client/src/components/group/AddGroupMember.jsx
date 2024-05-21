import React, { useRef } from "react";

function AddGroupMember(props) {
  const addMemberRef = useRef();

  const setGroupHandler = () => {
    // dispatch(groupActions.setCurrentGroup(props.id));
  };

  const addRefHandler = (event) => {
    props.onInvite(addMemberRef.current);
  };

  // useEffect(() => {

  // },[addMemberRef.current.value]);

  return (
    <div
      onClick={setGroupHandler}
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
          <h1 className="font-medium mb-1">{props.title}</h1>
          {/* Message */}
          <p
            className={`text-sm ${!props.unreadMsgs ? "text-neutral-400" : ""}`}
          >
            {props.info}
          </p>
        </div>
        {/* Timestamp and unread messages */}
        <div className="flex flex-col justify-between items-end h-100 text-xs">
          {/* Add  */}
          <div className="text-emerald-500 min-w-[55px]">
            <input
              type="button"
              value={"Add"}
              onClick={addRefHandler}
              data-key={props.id}
              data-name={props.title}
              ref={addMemberRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGroupMember;
