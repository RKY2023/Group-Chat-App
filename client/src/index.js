import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';



import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> // for stop twice api and re render
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);
