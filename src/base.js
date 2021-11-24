import { initializeApp, getApp } from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "spotify-2cede",
  appId: "1:486542043563:web:8e176dc9169b19147f0aee",
  storageBucket: "spotify-2cede.appspot.com",
  locationId: "us-central",
  apiKey: "AIzaSyAg-EDx9bgY3NwTCgmK7Mja5qa5zyhr9t0",
  authDomain: "spotify-2cede.firebaseapp.com",
  messagingSenderId: "486542043563",
  measurementId: "G-49F1F6ZGB9",
};

export const app = initializeApp(firebaseConfig);
const firebaseApp = getApp();
export const storage = getStorage(firebaseApp);
export const auth = getAuth();
export const fireDB = getFirestore(app);
