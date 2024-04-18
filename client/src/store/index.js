import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatReducer';
import uiReducer from './uiReducer';

const store = configureStore({
    reducer: {
      chat: chatReducer,
      ui: uiReducer,
    },
});

export default store;