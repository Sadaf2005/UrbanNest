// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-restate-7e3fd.firebaseapp.com",
  projectId: "mern-restate-7e3fd",
  storageBucket: "mern-restate-7e3fd.appspot.com",
  messagingSenderId: "710031568092",
  appId: "1:710031568092:web:4e341091cb3a19070ed819"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);