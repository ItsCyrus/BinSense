import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const admin = require("firebase-admin");

const firebaseConfig = {
  apiKey: "AIzaSyA1NLTDd6QdAYRS_SNel-7Ie27qlslknR0",
  authDomain: "binsense-aff88.firebaseapp.com",
  projectId: "binsense-aff88",
  storageBucket: "binsense-aff88.appspot.com",
  messagingSenderId: "516306797821",
  appId: "1:516306797821:web:f5f97403164c89eaf66a94",
  measurementId: "G-F3PWCJVX8Y",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
