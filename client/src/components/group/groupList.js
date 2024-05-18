import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from '../../store/chatReducer';
import { groupActions } from '../../store/groupReducer';

const GroupBody = (prop) => {
  // console.log('tt', group);
  const dispatch = useDispatch();
  const setNewGroupChatHandler = (event) => {
    const groupId = parseInt(event.target.dataset.group);
    console.log(groupId);
    dispatch(chatActions.setNewGroup(groupId));
  };

  return (
    <Row key={prop.group.id}>
      <Card style={{width: '100%' }}>
        <Card.Body>
          <Card.Title onClick={setNewGroupChatHandler} data-group={prop.group.id}>{prop.group.title}</Card.Title>
          <Card.Text>{prop.group.info}</Card.Text>
        </Card.Body>
      </Card>
    </Row>
  );
};

const GroupList = () => {
  const dispatch = useDispatch();
  const groups = useSelector(state => state.group.groups);
  const [bodyContent, setBodyContent] = useState();
  const getGroupList = async () => {
    const response = await fetch("http://localhost:5000/groupList",{
      method: "GET",
      headers: {
          'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    // console.log(data);
    if(data && data.message === 'success'){
      // dispatch(groupActions.setGroupList(data.groups));
      GroupBodyPaint(data.groups);
    }
  };

  const GroupBodyPaint = (groups) => {
    const content = groups.map( grp => {
      return (
        <GroupBody group={grp} key={grp.id}/>
      );
    });
    setBodyContent(content);
  }

  useEffect( () => {
    getGroupList();
  },[]);

  return (
    <>
    <Col className='mx-4'>
      {bodyContent}
    </Col>
    </>
  );
};

export { GroupBody };
export default GroupList;