import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Set to false to run the application completely offline without remote Firebase dependencies.
export const USE_FIREBASE = false;

const firebaseConfig = {
  apiKey: "AIzaSyB3BTN1H9d_lF7hm8Ba8FuboiE_eOFCyIU",
  authDomain: "lernbelt.firebaseapp.com",
  projectId: "lernbelt",
  storageBucket: "lernbelt.firebasestorage.app",
  messagingSenderId: "796260402035",
  appId: "1:796260402035:web:7f89ec22cf2efd7c503b06",
  measurementId: "G-B823KT1GS9"
};

let app: any = null;
let db: any = null;
let auth: any = null;

if (USE_FIREBASE) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);

    // Safe analytics boot (Analytics can fail on local file:// protocols)
    if (typeof window !== 'undefined' && window.location.protocol.startsWith('http')) {
      getAnalytics(app);
    }
  } catch (err) {
    console.warn("Firebase Analytics could not initialize in this environment:", err);
  }
}

export { db, auth };
