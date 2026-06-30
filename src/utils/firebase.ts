import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB3BTN1H9d_lF7hm8Ba8FuboiE_eOFCyIU",
  authDomain: "lernbelt.firebaseapp.com",
  projectId: "lernbelt",
  storageBucket: "lernbelt.firebasestorage.app",
  messagingSenderId: "796260402035",
  appId: "1:796260402035:web:7f89ec22cf2efd7c503b06",
  measurementId: "G-B823KT1GS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
export const auth = getAuth(app);

// Safe analytics boot (Analytics can fail on local file:// protocols)
try {
  if (typeof window !== 'undefined' && window.location.protocol.startsWith('http')) {
    getAnalytics(app);
  }
} catch (err) {
  console.warn("Firebase Analytics could not initialize in this environment:", err);
}
