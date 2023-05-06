// Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA1NLTDd6QdAYRS_SNel-7Ie27qlslknR0",
  authDomain: "binsense-aff88.firebaseapp.com",
  databaseURL: "https://binsense-aff88-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "binsense-aff88",
  storageBucket: "binsense-aff88.appspot.com",
  messagingSenderId: "516306797821",
  appId: "1:516306797821:web:f5f97403164c89eaf66a94",
  measurementId: "G-F3PWCJVX8Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const db_realtime = getDatabase(app);

export { app, auth, db, db_realtime };