import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/main.css';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider
    domain="kishu.us.auth0.com"
    clientId={process.env.REACT_APP_CLIENT_ID}
    redirectUri={'http://localhost:3000/dashboard'}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
