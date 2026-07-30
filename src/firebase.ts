// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALvlpDsazV8STwC5RotwEgFBzJawoxxW0",
  authDomain: "parasakthi-bakery.firebaseapp.com",
  projectId: "parasakthi-bakery",
  storageBucket: "parasakthi-bakery.firebasestorage.app",
  messagingSenderId: "298622831699",
  appId: "1:298622831699:web:c225b10c2d85dd8c110aa6",
  measurementId: "G-WEXF3D23M7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
