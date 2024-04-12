import { createSlice } from '@reduxjs/toolkit';

const initialChatStore = {
  theme: 'light',
  chats: [],
  users: [],
  receiverList: [],
  loggedInUserId: null,
  isInit: true,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChatStore,
  reducers: {
    toggleTheme( state, action) {
      const bodyElement = document.getElementsByTagName('body')[0];
      if(state.theme === 'light'){
        bodyElement.setAttribute('data-bs-theme','dark');
        state.theme = 'dark';
        localStorage.setItem('theme','dark');
      } else {
        bodyElement.setAttribute('data-bs-theme','light');
        state.theme = 'light';
        localStorage.setItem('theme','light');
      }
    },
    setTheme(state, action) {
      console.log('aatt');
      const bodyElement = document.getElementsByTagName('body')[0];
      const getTheme = localStorage.getItem('theme');
      if(getTheme === null){
        console.log('tat');
        state.theme = 'light';
        bodyElement.setAttribute('data-bs-theme','light');
        localStorage.setItem('theme','light');        
      }
    },
    setIsInit(state) {
      state.isInit = false;
    },
    setNewChats(state, action) {
      const payload = action.payload;
      const newChats = [...state.chats, ...payload];
      console.log(newChats);
      state.chats = newChats;
    },
    setReceiverList(state, action) {
      const payload = action.payload;
      const newReceiverList = [...state.receiverList, ...payload];
      console.log(newReceiverList);
    },
    setUsers(state, action) {
      const payload = action.payload;
      state.users = payload;
      console.log(state.users);
    },
    setUserId(state, action) {
      const payload = action.payload;
      console.log(payload);
      state.loggedInUserId = payload;
    },
  }
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;