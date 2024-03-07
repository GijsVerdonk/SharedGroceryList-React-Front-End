import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
  domain={import.meta.env.VITE_REACT_APP_DOMAIN}
  clientId={import.meta.env.VITE_REACT_APP_CLIENTID}
  authorizationParams={{ redirect_uri: window.location.origin }}>
  <App />
</Auth0Provider>
);