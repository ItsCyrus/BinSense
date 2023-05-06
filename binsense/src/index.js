import { app } from "./firebase";
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import "./styles/index.css";


function PrivateRoute({ children, ...rest }) {
  const [user] = useAuthState(auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
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