import React from "react";
import { Redirect, BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserView from "./components/UserView";
import AdminView from "./components/AdminView";
import "./styles//App.css";

function App() {
  const isAuthenticated = false;

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
        <PrivateRoute
          path="/userview"
          component={UserView}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/adminview"
          component={AdminView}
          isAuthenticated={isAuthenticated}
          isAdmin={true}
        />
      </Switch>
    </Router>
  );
}

function PrivateRoute({
  component: Component,
  isAuthenticated,
  isAdmin,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          isAdmin ? (
            <Component {...props} />
          ) : (
            <Redirect to="/userview" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default App;
