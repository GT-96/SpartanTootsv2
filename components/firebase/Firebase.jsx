import * as firebase from 'firebase';


// Optionally import the services that you want to use
 import "firebase/auth";
 import "firebase/database";
 import "firebase/firestore";
// import "firebase/functions";
// import "firebase/storage";

// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL5M9a3WBAATs_E_TBsl1eRo_MGJ08ePA",
  authDomain: "chat-b4701.firebaseapp.com",
  databaseURL: "https://chat-b4701.firebaseio.com",
  projectId: "chat-b4701",
  storageBucket: "chat-b4701.appspot.com",
  messagingSenderId: "639475765496",
  appId: "1:639475765496:web:0ad32495c673ea7e2e2b0d",
  measurementId: "G-6W0XEQ4GEK"
  };

export default firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
export const dbService = firebase.firestore();