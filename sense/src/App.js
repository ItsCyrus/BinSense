import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserView from "./components/UserView";
import AdminView from "./components/AdminView";
import Bar from "./components/Bar";

import "./styles/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setIsAuthenticated(true);
        console.log("User signed in", user);
      } else {
        // User is logged out
        signOut(auth);
        setIsAuthenticated(false);
        console.log("User signed out", user);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
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
        <Route exact path="/userview">
          <UserView />
        </Route>
        <Route exact path="/adminview">
          <AdminView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
