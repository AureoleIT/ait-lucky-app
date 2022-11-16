/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app"
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8-_ktKoGnG87bJksBu06_o489Xj8V6tU",
  authDomain: "ait-lucky-app.firebaseapp.com",
  databaseURL: "https://ait-lucky-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ait-lucky-app",
  storageBucket: "ait-lucky-app.appspot.com",
  messagingSenderId: "722133037936",
  appId: "1:722133037936:web:501e76a24dca2af4fd55b5",
  measurementId: "G-S0QRME7VTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = app.auth();
export {app, db, auth};