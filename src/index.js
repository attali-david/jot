import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './store'
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyDqYbdgBRW22duve6ayINUiRDw-Svb7n-k",
  authDomain: "journal-app-5bce7.firebaseapp.com",
  projectId: "journal-app-5bce7",
  storageBucket: "journal-app-5bce7.appspot.com",
  messagingSenderId: "449324596571",
  appId: "1:449324596571:web:fb60675ff80c66f15b2e7e"
});

const db = getFirestore(firebaseConfig)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
