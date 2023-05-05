const express = require("express");
const expressApp = express;
const app = expressApp();

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
