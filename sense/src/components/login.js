import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../firebase";
import Navbar from "./Navbar";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      const usersRef = firestore.collection("users");
      const querySnapshot = await usersRef.where("id", "==", email).get();

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userDoc = doc.data();

          if (userDoc.admin) {
            history.push("/adminview");
          } else {
            history.push("/userview");
          }
        });
      } else {
        console.log("User document not found");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
