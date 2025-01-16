import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Your CSS file if you have one
import App from './App';  // Importing App.js from the src folder
import reportWebVitals from './reportWebVitals';  // Optional for performance monitoring

// Render the App component inside the root div in your index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// This is used to measure app performance, optional
reportWebVitals();
