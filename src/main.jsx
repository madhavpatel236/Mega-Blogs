import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import store from './store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* here we provide the store to the app.jsx so that we can use it in the app.jsx */}
    <App />
    </Provider>
  </React.StrictMode>,
)
