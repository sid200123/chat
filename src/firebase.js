import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVMJmyj-XzUbt1YpZR3TyD4q7OkAInMnE",
  authDomain: "chat-da8a9.firebaseapp.com",
  projectId: "chat-da8a9",
  storageBucket: "chat-da8a9.appspot.com",
  messagingSenderId: "653426790691",
  appId: "1:653426790691:web:c335876397a1dc083b7c96",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
