import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from "@auth0/auth0-react"
import App from './App.jsx'
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-rco1au1aa1xfshj2.us.auth0.com"
    clientId="DGIsoEWgvUZBI9UyYS9cyknvFFV0NEWN"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
)
