import { createSlice } from "@reduxjs/toolkit";

const initialGroupStore = {
  groups: [],
  groupId: 0,
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
export default groupSlice.reducer;
