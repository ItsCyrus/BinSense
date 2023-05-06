import { useState } from "react";
import { app, auth } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { getDatabase } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const db = getDatabase(app);

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user.uid);

        const usersCollection = collection(db, "users");
        const userDoc = doc(usersCollection, user.uid);

        setDoc(userDoc, {
          subscriptions: [],
        })
          .then(() => {
            console.log("User document updated successfully");
          })
          .catch((error) => {
            console.error("Error updating user document:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Signup failed:", errorCode, errorMessage);
      });
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
