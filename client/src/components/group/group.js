import React from 'react'
import { Col } from 'react-bootstrap';
import NewGroup from './NewGroup/newGroup';
import GroupList from './groupList';
import { useSelector } from 'react-redux';

const Group = () => {
  const groups = useSelector(state => state.group.groups);

  return (
    <>
    <Col>
      <NewGroup />
      { groups && <GroupList />
      }
    </Col>
    </>
  );
};

export default Group;