import React, { useCallback, useRef, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useDispatch , useSelector } from 'react-redux';

const ChatForm = (props) => {
    const userId = useSelector(state => state.chat.loggedInUserId);
    
    const receiverList = useSelector(state => state.chat.receiverList);
    // console.log('ll',loginUserId, receiverList);
    const inputMsgRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        const msgData = {
            sender: userId,
            receiverList: receiverList || [],
            message: inputMsgRef.current.value
        }
        console.log(msgData);
        submitMsg(msgData);
    }

    const submitMsg = useCallback( async (msgData) => {
        const response = await fetch("http://localhost:5000/sendMsg",{
            method: "POST",
            body: JSON.stringify(msgData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        // console.log(data);
        if(data && data.thread === 'success'){
            props.onChats({ sender: msgData.sender, receiver: msgData.receiver, message: msgData.message});
        }
    },[]);
    
    return (
        <>
        <Form onSubmit={submitHandler}>
            <Form.Group className="mt-2">
                <Form.Control type="input" className="form-control" ref={inputMsgRef}/>
            </Form.Group>
            <Button type="submit" className="btn-success">Send</Button>
        </Form>
        </>
    );
};

export default ChatForm;