import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialChatStore = {
  theme: "light",
  chats: [],
  users: [],
  receiverList: [],
  loggedInUserId: null,
  isInit: true,
  lastMsgId: 0,
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
      }
    },
    setIsInit(state) {
      state.isInit = false;
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
          console.log('lmsg', lastMessageId);
          if (lastMessageId !== undefined) state.lastMsgId = lastMessageId;
        }
      }
      const newChats = [...state.chats, ...newPayload];
      console.log(newChats, state.lastMsgId);
      localStorage.setItem("msg", newChats);
      state.chats = newChats;
    },
    setReceiverList(state, action) {
      const payload = action.payload;
      const newReceiverList = [...state.receiverList, ...payload];
      state.receiverList = newReceiverList;
      // console.log(newReceiverList);
    },
    setUsers(state, action) {
      const payload = action.payload;
      state.users = payload;
      // console.log(state.users);
    },
    setUserId(state, action) {
      const payload = action.payload;
      // console.log(payload);
      state.loggedInUserId = payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
