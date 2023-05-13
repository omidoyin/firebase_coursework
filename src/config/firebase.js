 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDrsWA63UjUPmznrK0Ff-glYa1Jak4kgX0",
  authDomain: "fir-coursework-3c6b0.firebaseapp.com",
  projectId: "fir-coursework-3c6b0",
  storageBucket: "fir-coursework-3c6b0.appspot.com",
  messagingSenderId: "427346273639",
  appId: "1:427346273639:web:f7e6ac76f9ac7d9f44fbc2",
  measurementId: "G-MGTRE9DMJ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const db = getFirestore(app);
export const storage =getStorage(app);