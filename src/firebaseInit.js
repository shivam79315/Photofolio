// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvIpT6WFdTB-J16_gupE7uuWFkedFzCcc",
  authDomain: "photofolio-2eb46.firebaseapp.com",
  databaseURL: "https://photofolio-2eb46-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "photofolio-2eb46",
  storageBucket: "photofolio-2eb46.appspot.com",
  messagingSenderId: "739565311531",
  appId: "1:739565311531:web:5eab67b31d0fa7724cbc6e",
  measurementId: "G-RSEQQLP8H3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);