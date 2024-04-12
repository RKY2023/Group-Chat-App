import React, { useState } from "react";
import { useSelector } from "react-redux";

const ShowChats = (props) => {
    const chats = useSelector(state => state.chat.chats);
    const userId = useSelector(state => state.chat.loggedInUserId);

    console.log('show',chats);
    const chatsContent = chats.map((u) => {return (
        <>
        <div className="my-3">
        {(u.uid === userId) && 
        <>
            <div className="chat-msg__text w-auto float-end">You Joined</div><br/>
        </>
        }
        {u.uid && (u.uid !== userId) && 
        <>
            <div className="chat-msg__text w-auto float-start">{u.name} Joined</div><br/>
        </>
        }
        {(u.message) && (u.sender === userId) &&
        <>
            <div className="chat-msg__text w-auto float-end">{u.message}</div><br/>
        </>
        }
        {(u.message) && (u.sender !== userId) &&
        <>
            <div className="chat-msg__text w-auto float-start">{u.message}</div><br/>
        </>
        }
        
        </div>
        </>
    )})

    // const chatsContent = props.chats.map((thread) => {return (
    //     <>{thread}
    //     {(thread.sender == props.userId) && 
    //     <div className="row mt-1">
    //         <div className="chat-msg__text float-end">{thread.sender} Joined</div><br/>
    //     </div>
    //     }
    //     {(thread.sender != props.userId) && 
    //     <div className="row mt-1">
    //         <div className="chat-msg__text float-start">{thread.sender} Joined</div><br/>
    //     </div>
    //     }
    //     </>
    // )})

    return (
        <>
        <div className="my-2">
            {chatsContent}
        </div>
        </>
    );
};

export default ShowChats;