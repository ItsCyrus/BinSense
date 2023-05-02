const express = require("express");
const expressApp = express;
const app = expressApp();

// Firebase configuration
import { initializeApp } from "firebase/app";
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

const firebaseApp = initializeApp(firebaseConfig);
const db = admin.firestore();

app.get("/dustbins/:id", (req, res) => {
  const dustbinId = req.params.id;

  // Retrieve the dustbin document with the given ID from Firestore
  const dustbinRef = db.collection("dustbins").doc(dustbinId);
  dustbinRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        // If the dustbin document exists, return the dustbin status in the response
        res.send({ status: doc.data().status });
      } else {
        // If the dustbin document doesn't exist, return a 404 error
        res.status(404).send("Dustbin not found");
      }
    })
    .catch((error) => {
      // If there's an error retrieving the dustbin document, return a 500 error
      res.status(500).send("Error retrieving dustbin status");
    });
});
