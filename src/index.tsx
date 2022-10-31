import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM2 from "react-dom";
import SponsorHome from './sponsor/organism/Home/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-laoquug3.us.auth0.com"
    clientId="QmSkQRLon0Xp1ZUmfGMi5oszDNF0Rder"
    redirectUri="http://localhost:3000/dashboard"
  >
    <App />
  </Auth0Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
