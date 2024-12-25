import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfh-9Xv4-YVg2XgEVm1TTc9SlqwtCvDRA",
  authDomain: "chatapplication-f075e.firebaseapp.com",
  databaseURL: "https://chatapplication-f075e-default-rtdb.firebaseio.com",
  projectId: "chatapplication-f075e",
  storageBucket: "chatapplication-f075e.firebasestorage.app",
  messagingSenderId: "698832275418",
  appId: "1:698832275418:web:0ac75af84a63af7de422e3",
  measurementId: "G-FB159SCKV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
