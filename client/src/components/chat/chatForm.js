import React, { useCallback, useRef, useState } from "react";
import { Form, Button } from 'react-bootstrap';

const ChatForm = () => {
    const [loginUserId, setUserId] = useState(1);
    const inputMsgRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        const msgData = {
            sender: loginUserId,
            receiver: 2,
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
        console.log(response);
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