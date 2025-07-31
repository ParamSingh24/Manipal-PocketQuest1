import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAG3CitDeRrjoMDUZCXO0ppym8T1GrJ_GA",
  authDomain: "mits-careerboost.firebaseapp.com",
  projectId: "mits-careerboost",
  storageBucket: "mits-careerboost.firebasestorage.app",
  messagingSenderId: "620529797748",
  appId: "1:620529797748:web:dd4ac290be44ffbf43df21",
  measurementId: "G-1RCL0037GE"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
