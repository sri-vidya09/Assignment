import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCLJZFLaAE4xRfwlRMUBVXIwdx6OSW2YvA",
  authDomain: "assignment-7c73f.firebaseapp.com",
  projectId: "assignment-7c73f",
  storageBucket: "assignment-7c73f.appspot.com",
  messagingSenderId: "635836576560",
  appId: "1:635836576560:web:399229c2fdd428efbd0ef5",
  measurementId: "G-9XPBXCM9TY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

