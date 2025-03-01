import { createSlice } from "@reduxjs/toolkit";

const initialGroupStore = {
  groups: [],
  groupId: '',
  isNewGroupRequired: false,
  newCreateGroup: [],
  currentGroupName: '',
  currentGroupInfo: '',
  currentGroupImg: '',
  groupMembers: [],
};

const groupSlice = createSlice({
  name: "group",
  initialState: initialGroupStore,
  reducers: {
    setGroupId (state, action) {
      state.groupId = action.payload;
      state.currentGroupName = '';
      state.currentGroupInfo = '';
      state.currentGroupImg = '';
      state.groupMembers = [];
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
      console.log('AGP',activeGroup);
      state.currentGroupImg = activeGroup.gp;
      state.currentGroupName = activeGroup.title;
      state.currentGroupInfo = activeGroup.info;
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

export const selectGroupId = (state) => state.group.groupId;

export default groupSlice.reducer;
