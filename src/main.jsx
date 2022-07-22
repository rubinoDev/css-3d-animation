import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App>
      <div style={{background: "#fff", width: '500px', height: '500px'}}/>
    </App>
  </React.StrictMode>
)
