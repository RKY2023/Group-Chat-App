import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialUIStore = {
  isModalShown: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUIStore,
  reducers: {
    toggleModal( state, action) {
      state.isModalShown = !state.isModalShown;
      console.log(state.isModalShown);
    }
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
