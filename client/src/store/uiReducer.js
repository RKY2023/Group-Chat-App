import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialUIStore = {
  isModalShown: false,
  isCreateGroupShown: false,
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
    }
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
