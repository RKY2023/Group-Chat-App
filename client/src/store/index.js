import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatReducer';
import uiReducer from './uiReducer';
import groupReducer from './groupReducer';

const store = configureStore({
    reducer: {
      ui: uiReducer,
      chat: chatReducer,
      group: groupReducer,
    },
});

export default store;