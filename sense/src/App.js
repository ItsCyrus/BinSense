import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { db, auth } from "./firebase";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserView from "./components/UserView";
import AdminView from "./components/AdminView";
import Bar from "./components/Bar";
import { AuthProvider } from "./AuthContext";
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
        signOut(auth);
        setIsAuthenticated(false);
        setIsAdmin(false);

        // Redirect user to login page
        history.push("/login");
      }
    });

    return () => unsubscribe();
  }, [history]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsAuthenticated(false);
        setIsAdmin(false);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <AuthProvider isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
      <Router>
        <Bar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            {isAuthenticated ? <Redirect to="/userview" /> : <Login />}
          </Route>
          <Route path="/signup">
            {isAuthenticated ? <Redirect to="/userview" /> : <Signup />}
          </Route>
          <Route
            path="/userview"
            render={() =>
              isAuthenticated ? <UserView /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/adminview"
            render={() =>
              isAuthenticated && isAdmin ? (
                <AdminView />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
