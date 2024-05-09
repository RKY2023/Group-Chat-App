import { createSlice } from "@reduxjs/toolkit";

const initialGroupStore = {
  groups: [],  
};

const groupSlice = createSlice({
  name: "group",
  initialState: initialGroupStore,
  reducers: {
    setGroupList (state, action) {
      state.groups = action.payload;
    },
    addGroup( state, action) {
      state.groups = [action.payload, ...state.groups];
    }
  }
});

export const groupActions = groupSlice.actions;
export default groupSlice.reducer;
