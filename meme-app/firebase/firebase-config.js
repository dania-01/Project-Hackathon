import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCdqoh7xK23P1LmMjYlRalehsbSEw_qTrg",
  authDomain: "memebattle-fe1b6.firebaseapp.com",
  projectId: "memebattle-fe1b6",
  storageBucket: "memebattle-fe1b6.appspot.com",
  messagingSenderId: "160315390218",
  appId: "1:160315390218:web:5b4c3c37bcce9f371262f3",
  measurementId: "G-RY0C08371Y"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app);

export { app, auth };