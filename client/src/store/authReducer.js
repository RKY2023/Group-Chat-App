import { createSlice } from '@reduxjs/toolkit';

const initialAuthStore = {
  userId: null,
  userName: 'user',
  isAuthenticated: false,
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthStore,
  reducers: {
    checkLoginStatus(state){
      if(state.token != null && state.token != 'undefined' && state.token.length > 500){
          state.isAuthenticated = true;
      }
    },
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem('token',state.token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('token');
    },
    setUserId(state, action) {
      const token = localStorage.getItem('token');
      if(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
  
        const userData = JSON.parse(jsonPayload);
        // console.log(userData);
        state.userId = userData.userid;
        state.userName = userData.username;
        state.userEmail = userData.useremail;
      }
    },
    setUser(state, action) {
      const user = action.payload;
      state.userId = user.id;
      state.userName = user.name;
      state.userEmail = user.email;
      state.isLoggedIn = user.isLoggedIn;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;