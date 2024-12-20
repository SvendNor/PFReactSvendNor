import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_gzKWYm3s5bhNOFAg1jT1RXTW2hc1aNE",
  authDomain: "farmacia-farah.firebaseapp.com",
  projectId: "farmacia-farah",
  storageBucket: "farmacia-farah.appspot.com",
  messagingSenderId: "646759162385",
  appId: "1:646759162385:web:3ab02bbeb7864065ec87b0",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export default db;
