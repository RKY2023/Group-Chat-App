import { createSlice } from "@reduxjs/toolkit";

const initialChatStore = {
  theme: "light",
  chats: [],
  users: [],
  groupId: '',
  onlineUserList: [],
  loggedInUserId: null,
  isInit: true,
  lastMsgId: '',
  newCreateGroup: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialChatStore,
  reducers: {
    toggleTheme(state, action) {
      const bodyElement = document.getElementsByTagName("body")[0];
      if (state.theme === "light") {
        bodyElement.setAttribute("data-bs-theme", "dark");
        state.theme = "dark";
        localStorage.setItem("theme", "dark");
      } else {
        bodyElement.setAttribute("data-bs-theme", "light");
        state.theme = "light";
        localStorage.setItem("theme", "light");
      }
    },
    setTheme(state, action) {
      // console.log("aatt");
      const bodyElement = document.getElementsByTagName("body")[0];
      const getTheme = localStorage.getItem("theme");
      if (getTheme === null) {
        // console.log("tat");
        state.theme = "light";
        bodyElement.setAttribute("data-bs-theme", "light");
        localStorage.setItem("theme", "light");
      } else if (getTheme === 'dark'){
        state.theme = "dark";
        bodyElement.setAttribute("data-bs-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else if (getTheme === 'light'){
        state.theme = "light";
        bodyElement.setAttribute("data-bs-theme", "light");
        localStorage.setItem("theme", "light");
      }
    },
    setIsInit(state) {
      state.isInit = false;
    },
    setNewChats(state, action) {
      const payload = action.payload;
      // let threads = [
      //   {
      //     "_id": "67c38fac5eb18c7d34251509",
      //     "message": "sdasdasd",
      //     "isLink": false,
      //     "isImg": false,
      //     "userId": {
      //       "_id": "67bb5d76433b01753d7044d7",
      //       "isLoggedIn": true
      //     },
      //     "groupId": "67bb5fdc433b01753d7044e6",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "67c6d98c32394f4c06430cb7",
      //     "message": "msg1",
      //     "isLink": false,
      //     "isImg": false,
      //     "userId": {
      //       "_id": "67bb5d76433b01753d7044d7",
      //       "isLoggedIn": true
      //     },
      //     "groupId": "67bb5fdc433b01753d7044e6",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "67c6daa732394f4c06430cb9",
      //     "message": "msg1",
      //     "isLink": false,
      //     "isImg": false,
      //     "userId": {
      //       "_id": "67bb5d76433b01753d7044d7",
      //       "isLoggedIn": true
      //     },
      //     "groupId": "67bb5fdc433b01753d7044e6",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "67c6db1332394f4c06430cbb",
      //     "message": "msg11",
      //     "isLink": false,
      //     "isImg": false,
      //     "userId": {
      //       "_id": "67bb5d76433b01753d7044d7",
      //       "isLoggedIn": true
      //     },
      //     "groupId": "67bb5fdc433b01753d7044e6",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "67c6db8016d0c0517c8ca2be",
      //     "message": "dasd",
      //     "isLink": false,
      //     "isImg": false,
      //     "userId": {
      //       "_id": "67bb5d76433b01753d7044d7",
      //       "isLoggedIn": true
      //     },
      //     "groupId": "67bb5fdc433b01753d7044e6",
      //     "__v": 0
      //   }
      // ]
      console.log('pl',payload, state.lastMsgId);
      let newPayload;
      // if (payload.length > 0 && payload[0].uid > 0) {
      if (payload.length > 0) {
        if (state.lastMsgId.length > 12) {
          newPayload = payload.filter((p) => {
            return p._id > state.lastMsgId;
          });
        } else {
          newPayload = payload;
        }
        if (newPayload.length !== 0) {
          const lastMessageId = newPayload[newPayload.length - 1]._id;
          if (lastMessageId !== undefined) state.lastMsgId = lastMessageId;
          console.log('newPayload', newPayload);
      const newChats = [...state.chats, ...newPayload];
      console.log(newChats, state.lastMsgId);
      localStorage.setItem("msg", newChats);
      state.chats = newChats;
        }
      } else {
        console.log('Empty threads');
      }
      
    },
    setReceiverList(state, action) {
      const payload = action.payload;
      const newOnlineUserList = [...state.onlineUserList, ...payload];
      state.onlineUserList = newOnlineUserList;
    },
    setUsers(state, action) {
      const payload = action.payload;
      state.users = payload;
      // console.log(state.users);
    },
    setUserId(state, action) {
      const token = localStorage.getItem('token');
      if(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
  
        const userData = JSON.parse(jsonPayload);
        console.log(userData);
        state.loggedInUserId = userData.userid;
      } else {
        state.loggedInUserId = null;
        state.groupId = '';
      }
    },
    setNewCreatedGroup(state, action) {
      state.newCreateGroup = action.payload;
    },
    setLastMsgId(state, action) {
      state.lastMsgId = action.payload;
    },
    setNewGroupChats(state, action) {
      state.lastMsgId = '';
      state.chats = [];
    },
  }
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
