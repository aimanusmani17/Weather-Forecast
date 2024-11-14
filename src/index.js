import React from 'react';
import ReactDOM from 'react-dom/client';
import Weather from './components/Weather'
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Weather /> */}
  </React.StrictMode>
);

