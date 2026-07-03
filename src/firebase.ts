import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPPqtKAPUR8GwS5eOqOUoiXz4BPZVhXKY",
  authDomain: "baby-evvala-journey.firebaseapp.com",
  projectId: "baby-evvala-journey",
  storageBucket: "baby-evvala-journey.firebasestorage.app",
  messagingSenderId: "840323212199",
  appId: "1:840323212199:web:eae9a9c3be5065cce88c82",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);