// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHrfNrxGxndV73SLPzK_VQxDxmX8mYS4o",
  authDomain: "podify-889e8.firebaseapp.com",
  projectId: "podify-889e8",
  storageBucket: "podify-889e8.appspot.com",
  messagingSenderId: "437780227453",
  appId: "1:437780227453:web:9fda3b59fe4679815bd814",
  measurementId: "G-6S42MCTCBL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
