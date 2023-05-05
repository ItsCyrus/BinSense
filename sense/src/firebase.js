// Firebase SDK
import { initializeApp } from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

// Hooks
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'

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

export const app = initializeApp(firebaseConfig);

const auth = app.auth()
const firestore = app.firestore()