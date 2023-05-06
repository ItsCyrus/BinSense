const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addUserToFirestore = functions.auth.user().onCreate((user) => {
  const { email, password } = user;

  const userDoc = {
    admin: false,
    email,
    password,
    subscriptions: [],
  };

  return admin.firestore().collection("users").doc(uid).set(userDoc);
});
