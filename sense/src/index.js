import { app } from "./firebase";
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import { getAuth } from 'firebase/auth';
import { useAuth } from 'firebase/auth';
import "./styles/index.css";

function PrivateRoute({ children, ...rest }) {
  const currentUser = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <PrivateRoute exact path="/admin">
          <admin />
        </PrivateRoute>

        <PrivateRoute exact path="/user">
          <user />
        </PrivateRoute>

        <Route exact path="/">
          <home />
        </Route>

        <Route exact path="/login">
          <login />
        </Route>

        <Route exact path="/signup">
          <signup />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>
);

/* <section>{user ? <userview /> : <loginpage />}</section> */