
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALvlpDsazV8STwC5RotwEgFBzJawoxxW0",
  authDomain: "parasakthi-bakery.firebaseapp.com",
  projectId: "parasakthi-bakery",
  storageBucket: "parasakthi-bakery.firebasestorage.app",
  messagingSenderId: "298622831699",
  appId: "1:298622831699:web:7851908c568157ab110aa6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
