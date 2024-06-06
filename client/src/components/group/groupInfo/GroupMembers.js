import React from 'react'
import { useSelector } from 'react-redux';
import CardList from '../../Common/CardList';
import { grf1 } from "../../../assets/groupchat";

function GroupMembers() {
  const groupMembers = useSelector(state => state.group.groupMembers);
  return (
    <>
    {groupMembers.map((group, i) => {
      return (
        <CardList
          elem-type={'groupMembers'}
          id={group.id}
          groupid={group.groupid}
          userid={group.userid}
          gp={grf1}
          name={group.name}
          isAdmin={group.isAdmin}
        />
      );
    })}
    </>
  )
}

export default GroupMembers