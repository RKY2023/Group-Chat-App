import React, { useCallback, useRef, useState } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch , useSelector } from 'react-redux';

const ChatForm = (props) => {
    const userId = useSelector(state => state.chat.loggedInUserId);
    const groupId = useSelector(state => state.chat.groupId);
    
    const receiverList = useSelector(state => state.chat.receiverList);
    // console.log('ll',loginUserId, receiverList);
    const inputMsgRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        const msgData = {
            userId,
            message: inputMsgRef.current.value,
            groupId: groupId,
        }
        console.log(msgData);
        submitMsg(msgData);
        inputMsgRef.current.value = '';
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
      <Col>
      <Row className="chat-form__section">
        <Col>
          <Form.Group className="chat-form__input">
              <Form.Control type="input" className="form-control" ref={inputMsgRef} />
          </Form.Group>
        </Col>
        <Col xs={2} md={2} className="chat-form__btn">
          <Button type="submit" className="btn-success">Send</Button>
        </Col>
      </Row>
      </Col>
    </Form>
    </>
    );
};

export default ChatForm;