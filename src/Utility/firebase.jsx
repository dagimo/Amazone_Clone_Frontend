// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import getAuth from firebase for authentication
import {getAuth} from 'firebase/auth'
// import  "firebase/compat/firestore"
// import "firebase/compat/auth"
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6itqo2lTcFEho937hDWEwMsmZza1JbPA",
  authDomain: "clone-80fab.firebaseapp.com",
  projectId: "clone-80fab",
  storageBucket: "clone-80fab.firebasestorage.app",
  messagingSenderId: "481401682384",
  appId: "1:481401682384:web:45837571c875ad850fa1d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const db = app.firestore() is changed to the below
export const db = getFirestore(app)
export const auth = getAuth(app) //This line exports the authentication service instance, obtained using the modular getAuth function.
