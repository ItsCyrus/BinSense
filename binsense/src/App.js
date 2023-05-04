import "./styles/App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

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

function App() {
  return (
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
  );
}

export default App;
