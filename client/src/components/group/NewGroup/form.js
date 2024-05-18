import { useEffect, useRef, useState } from "react";
import Modal from "../../UI/Modal/Modal"
import { Form, Button } from 'react-bootstrap';
import { uiActions } from "../../../store/uiReducer";
import { useDispatch } from "react-redux";
import { chatActions } from "../../../store/chatReducer";
import { groupActions } from "../../../store/groupReducer";

const NewGroupForm = (props) => {
  const inputGroupNameRef = useRef();
  const [users, setUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [apiNotCalled, setApiNotCalled] = useState(true);
  const dispatch = useDispatch();

  const inviteHandler = (event) => {
    const newInvitedUser = event.target.parentElement.dataset.key;   ;
    setInvitedUsers([...invitedUsers, newInvitedUser]);
  };

  const userListApi = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:5000/userList",{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    const data = await response.json();
    console.log(data);
    if(data && data.message === 'success'){
      setUsers(data.users);
    }
  };
  
  const submitHandler = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:5000/newGroup",{
      method: "POST",
      body: JSON.stringify({
        title: inputGroupNameRef.current.value,
        invites: invitedUsers,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    });
    const data = await response.json();
    console.log(data);
    if(data && data.message === 'success'){
      dispatch(chatActions.setNewCreatedGroup(data.group));
      dispatch(uiActions.toggleModal());
      dispatch(groupActions.addGroup(data.group));
    }
  };


  const userList = users.map( u => {
    return (
    <div key={u.id} data-key={u.id} className="flex mt-2">
      <label>{u.name}</label>
      <Button onClick={inviteHandler} className="flex-end">Invite</Button>
    </div>
    );
  });


  useEffect(() => {
    if( apiNotCalled ) {
      userListApi();
      setApiNotCalled(false);
    }
    
  },[]);
  console.log(users, invitedUsers);

  return (
    <Modal>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Enter Group Name</Form.Label>
          <Form.Control type="input" ref={inputGroupNameRef}/>
        </Form.Group>
        <Form.Group>
          {userList}
        </Form.Group>
        <Button type="submit" className="mt-3">Create Group</Button>
      </Form>
    </Modal>
  )
}

export default NewGroupForm;