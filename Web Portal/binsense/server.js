const admin = require("firebase-admin");

const serviceAccount = require("./path/to/your/firebase-project-credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-name.firebaseio.com",
});

const express = require("express");
const app = express();

app.get("/dustbins/:id", (req, res) => {
  // Retrieve the dustbin document with the given ID from Firestore
  // Return the dustbin status in the response
});

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
