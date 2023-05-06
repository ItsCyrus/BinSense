import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import { db, auth } from "./firebase";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserView from "./components/UserView";
import AdminView from "./components/AdminView";
import "./styles/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setIsAuthenticated(true);

        // Check if user is an admin
        const userRef = doc(db, "users", user.uid);
        getDoc(userRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              setIsAdmin(userData.admin);

              // Redirect user to UserView or AdminView based on admin status
              history.push(userData.admin ? "/adminview" : "/userview");
            }
          })
          .catch((error) => {
            console.error("Error getting user document:", error);
          });
      } else {
        // User is logged out
        setIsAuthenticated(false);
        setIsAdmin(false);

        // Redirect user to login page
        history.push("/login");
      }
    });

    return () => unsubscribe();
  }, [history]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route
          path="/userview"
          component={UserView}
          isAuthenticated={isAuthenticated}
        />
        <Route
          path="/adminview"
          component={AdminView}
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
        />
      </Switch>
    </Router>
  );
}

export default App;