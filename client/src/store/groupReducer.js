import { createSlice } from "@reduxjs/toolkit";

const initialGroupStore = {
  groups: [],
  groupId: 0,
  isNewGroupRequired: false,
  isGroupListSet: false,
  newCreateGroup: [],
  currentGroupName: '',
  currentGroupInfo: '',
  currentGroupImg: '',
  activeGroupIndex: 0,
  groupMembers: [],
};

const groupSlice = createSlice({
  name: "group",
  initialState: initialGroupStore,
  reducers: {
    setIsGroupListSet(state){
      state.isGroupListSet = true;
      console.log('Gp set',state.isGroupListSet);
    },
    setGroupId (state, action) {
      state.groupId = action.payload;
    },
    setGroupList (state, action) {
      state.groups = action.payload;
    },
    addGroup( state, action) {
      state.groups = [action.payload, ...state.groups];
    },
    setNewGroup(state, action) {
      state.groupId = action.payload;
      // state.lastMsgId = 0;
      // // state.chats = [];
      // state.isInit = true;
    },
    setCurrentGroup(state, action){
      const activeGroup = action.payload;
      // console.log('AGP',activeGroup);
      state.currentGroupImg = activeGroup.gp;
      state.currentGroupName = activeGroup.title;
      state.currentGroupInfo = activeGroup.info;
      state.activeGroupIndex = activeGroup.activeGroupIndex;
    },
    setIsNewGroupRequired(state, action) {
      state.isNewGroupRequired = action.payload;
    },
    setGroupMembersList (state, action) {
      state.groupMembers = action.payload;
    },
  }
});

export const groupActions = groupSlice.actions;
export default groupSlice.reducer;
