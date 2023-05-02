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

  const dustbinRef = db.collection("dustbins").doc(dustbinId);
  dustbinRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        res.send({ status: doc.data().status });
      } else {
        res.status(404).send("Dustbin not found");
      }
    })
    .catch((error) => {
      res.status(500).send("Error retrieving dustbin status");
    });
});
