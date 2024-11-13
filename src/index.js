import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/reset.css';  // Ant Design reset styles
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
