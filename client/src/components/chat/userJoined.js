import React, { useState } from "react";


const UserJoined = (props) => {
    const [userId, setUserId] = useState(props.userId);

    console.log(props);

    const chatsContent = props.chats.map((thread) => {return (
        <>
        {(thread.sender == userId) && 
        <div className="row mt-1">
            <div className="chat-msg__text float-end">{thread.sender} Joined</div><br/>
        </div>
        }
        {(thread.sender != userId) && 
        <div className="row mt-1">
            <div className="chat-msg__text float-start">{thread.sender} Joined</div><br/>
        </div>
        }
        </>
    )})

    return (
        <>
        <div className="chat-msg">
            {chatsContent}
        </div>
        </>
    );
};

export default UserJoined;