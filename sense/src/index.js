import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";

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

{
  /* <section>{user ? <userview /> : <loginpage />}</section> */
}
