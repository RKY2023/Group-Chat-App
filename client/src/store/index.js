import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatReducer';
import uiReducer from './uiReducer';
import groupReducer from './groupReducer';
import authReducer from './authReducer';

const store = configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer,
      chat: chatReducer,
      group: groupReducer,
    },
});

export default store;