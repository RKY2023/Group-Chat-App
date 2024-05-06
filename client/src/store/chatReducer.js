import { createSlice } from "@reduxjs/toolkit";

const initialChatStore = {
  theme: "light",
  chats: [],
  users: [],
  groupId: 0,
  onlineUserList: [],
  loggedInUserId: null,
  isInit: true,
  lastMsgId: 0,
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
      console.log("aatt");
      const bodyElement = document.getElementsByTagName("body")[0];
      const getTheme = localStorage.getItem("theme");
      if (getTheme === null) {
        console.log("tat");
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
    setNewGroup(state, action) {
      state.groupId = action.payload;
      state.lastMsgId = 0;
      // state.chats = [];
      state.isInit = true;
    },
    setNewChats(state, action) {
      const payload = action.payload;
      let newPayload;
      // console.log('tt',state.receiverList.length);
      if (payload.length > 0 && payload[0].uid > 0) {
        // newPayload = payload.filter((p) => {
        //   // for ( let  pp of state.receiverList )
        //   // console.log('tt',state.receiverList.length,p);
        // });
        // console.log("uid", newPayload);
        newPayload = payload;
      } else {
        newPayload = payload.filter((p) => {
          return p.id > state.lastMsgId;
        });
        if (newPayload.length > 0) {
          const lastMessageId = newPayload[newPayload.length - 1].id;
          // console.log('lmsg', lastMessageId);
          if (lastMessageId !== undefined) state.lastMsgId = lastMessageId;
        }
      }
      const newChats = [...state.chats, ...newPayload];
      // console.log(newChats, state.lastMsgId);
      localStorage.setItem("msg", newChats);
      state.chats = newChats;
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
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const userData = JSON.parse(jsonPayload);
      console.log(userData);
      state.loggedInUserId = userData.userid;
    },
    setNewCreatedGroup(state, action) {
      state.newCreateGroup = action.payload;
    },
  }
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
