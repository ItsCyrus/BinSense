import "./styles/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
        <Route exact path="/">
          // Home page content
        </Route>
        <Route exact path="/login">
          // Login page content
        </Route>
        <PrivateRoute exact path="/dashboard">
          // User dashboard content
        </PrivateRoute>
        <PrivateRoute exact path="/admin">
          // Admin dashboard content
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
