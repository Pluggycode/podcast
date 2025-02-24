// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "my-2025-22adf.firebaseapp.com",
  projectId: "my-2025-22adf",
  storageBucket: "my-2025-22adf.firebasestorage.app",
  messagingSenderId: "1039547283898",
  appId: "1:1039547283898:web:76b50295dd2efedbff4583",
  measurementId: "G-T1JZ8T2CLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);