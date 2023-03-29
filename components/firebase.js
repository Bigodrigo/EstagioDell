// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiBXvHZ4ecHONd4geAzQ164aX1-vovThk",
  authDomain: "desafiodellestagio.firebaseapp.com",
  projectId: "desafiodellestagio",
  storageBucket: "desafiodellestagio.appspot.com",
  messagingSenderId: "219256333225",
  appId: "1:219256333225:web:68b6d1466916f45aec5ab8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app,db}