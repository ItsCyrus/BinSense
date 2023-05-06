import "../styles/Signup.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user.uid);

        const usersCollection = collection(db, "users");
        const userDoc = doc(usersCollection, user.uid);

        setDoc(userDoc, {
          id: user.email,
          subscriptions: [],
          admin: false,
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
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-title">Create an Account</h2>
        {error && <p className="signup-error">{error}</p>}
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
          />
          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>
        <p className="signup-login">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
