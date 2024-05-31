import { createSlice } from "@reduxjs/toolkit";

// api_url: 'http://13.53.45.119:5000' || 'http://localhost:5000',
const initialUIStore = {
  theme: "light",
  api_url: 'http://13.53.45.119:5000',  
  // api_url: window.location.origin,
  isModalShown: false,
  isCreateGroupShown: false,
  isGroupInfoShown: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUIStore,
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
      // console.log("aatt");
      const bodyElement = document.getElementsByTagName("body")[0];
      const getTheme = localStorage.getItem("theme");
      if (getTheme === null) {
        // console.log("tat");
        state.theme = "light";
        bodyElement.setAttribute("data-bs-theme", "light");
        localStorage.setItem("theme", "light");
      } else if (getTheme === 'dark'){
        state.theme = "dark";
        bodyElement.setAttribute("data-bs-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else if (getTheme === 'light'){
        state.theme = "light";
        bodyElement.setAttribute("data-bs-theme", "light");
        localStorage.setItem("theme", "light");
      }
    },
    updateUrl(state){
      state.api_url = state.api_url.replace('3000','5000');
    },
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
