import React from 'react';
import ReactDOM from 'react-dom';
import { store } from 'store';
import { checkAuth } from 'store/ducks';
import App from './App';
import './styles/index.css';

store.dispatch(checkAuth());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
