import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6DRaVxpq8B3pDC5uuXKgct7MS4od-bwk",
  authDomain: "farmacia-e7188.firebaseapp.com",
  projectId: "farmacia-e7188",
  storageBucket: "farmacia-e7188.appspot.com",
  messagingSenderId: "424373937822",
  appId: "1:424373937822:web:4d528bd9946954039f3d8f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
