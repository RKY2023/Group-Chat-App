import { createSlice } from "@reduxjs/toolkit";

const initialChatStore = {
  chats: [],
  users: [],
  groupId: 0,
  onlineUserList: [],
  isInit: true,
  lastMsgId: 0,
  newCreateGroup: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialChatStore,
  reducers: {
    setIsInit(state) {
      state.isInit = false;
    },
    setNewChats(state, action) {
      const payload = action.payload;
      let newPayload;
      // console.log('chats',payload);
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
    setNewChatsWS(state, action) {
      const payload = action.payload;
      const newChats = [...state.chats, payload];
      localStorage.setItem("msg", newChats);
      state.chats = newChats;
      // console.log('chats=> ',newChats);
    },
    setReceiverList(state, action) {
      const payload = action.payload;
      const newOnlineUserList = [...state.onlineUserList, ...payload];
      state.onlineUserList = newOnlineUserList;
    },
    setNewCreatedGroup(state, action) {
      state.newCreateGroup = action.payload;
    },
    setLastMsgId(state, action) {
      state.lastMsgId = action.payload;
    },
    setNewGroupChats(state, action) {
      state.lastMsgId = 0;
      state.chats = [];
    }
  }
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
