import { useDispatch, useSelector } from "react-redux";
// import Group from "../group/group";
import { Row, Col } from "react-bootstrap";
import { chatActions } from "../../store/chatReducer";
import { useEffect } from "react";

const MainView = () => {
  const dispatch = useDispatch();
  const api_url = `${process.env.REACT_APP_API_URL}`;
  const userId = useSelector(state => state.chat.loggedInUserId);

  const getOnlineUsers = async () => {
    const response = await fetch(api_url+"/api/onlineUsers",{
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    // console.log(data);
    
    if( data && data.onlineUsers){
      dispatch(chatActions.setUsers(data.onlineUsers));
      const newOnlineUserList = [];
      data.onlineUsers.forEach(u => {
        if(u.uid !== userId)
          newOnlineUserList.push(u.uid);
      });
      dispatch(chatActions.setReceiverList(newOnlineUserList));
      dispatch(chatActions.setNewChats(data.onlineUsers));   
    }
  };

  useEffect(() => {
    // if(isInit) {      
      getOnlineUsers();
      // dispatch(chatActions.setIsInit());
    // }
  },[]);

  return (
    <>
    <Row style={{width: '100vw', height: '80vh' }}> 
      <Col xs={3} md={4} className="groups">
        {/* <Group /> */}
      </Col>
      <Col xs={9} md={8} className="chats">
        {/* <Chat /> */}
      </Col>
    </Row>
    </>
  );
};

export default MainView;