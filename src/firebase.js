import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDR_ro1t8OHNRP4AKFBuwkQqIYp5CARvzg",
  authDomain: "chat-app-a38ba.firebaseapp.com",
  projectId: "chat-app-a38ba",
  storageBucket: "chat-app-a38ba.firebasestorage.app",
  messagingSenderId: "473990361407",
  appId: "1:473990361407:web:f5590d252e33f83662e38a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
