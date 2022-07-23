import React from 'react';
import ReactDOM from 'react-dom/client';
import Animation from './App.jsx';
import face from '/src/face.jpg';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Animation shadow depth="high" shadowColor="#0d8a2c" shadowOpacity={1}>
      <img src={face} alt="dsdsd"/>
    </Animation>
  </React.StrictMode>
)
