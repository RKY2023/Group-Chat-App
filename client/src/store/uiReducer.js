import { createSlice } from "@reduxjs/toolkit";

const initialUIStore = {
  api_url:'http://localhost:5000',
  isModalShown: false,
  isCreateGroupShown: false,
  isGroupInfoShown: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUIStore,
  reducers: {
    toggleModal( state, action) {
      state.isModalShown = !state.isModalShown;
      console.log(state.isModalShown);
    },
    toggleCreateGroup ( state, action) {
      state.isCreateGroupShown = !state.isCreateGroupShown;
      console.log(state.isCreateGroupShown);
    },
    toggleInfoGroup ( state, action) {
      state.isGroupInfoShown = !state.isGroupInfoShown;
      console.log(state.isGroupInfoShown);
    }
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
