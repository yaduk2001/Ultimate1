import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWGNobbod72SLwsKAuX-pMtMmz_XRyp10",
  authDomain: "ultimate-a7e54.firebaseapp.com",
  projectId: "ultimate-a7e54",
  storageBucket: "ultimate-a7e54.firebasestorage.app",
  messagingSenderId: "1007394762863",
  appId: "1:1007394762863:web:d45e99ce8bb639ee1cdd9a",
  measurementId: "G-2V0CN90KJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);
export { analytics }; 