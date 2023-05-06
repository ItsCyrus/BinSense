import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/App.css";

function Bar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isLoginOrSignupPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.error("Signed out:");
      })
      .catch((error) => {
        console.log("Couldn't Sign-out");
      });
  };

  // Login link component
  function LoginLink() {
    return (
      <Link to="/login" className="navbar-link">
        Login
      </Link>
    );
  }

  return (
    <nav>
      <Link to="/" className="navbar-title">
        BinSense
      </Link>

      <div className="navbar-content">
        {!isLoginOrSignupPage && (
          <span>
            {isHomePage ? (
              <LoginLink />
            ) : (
              <button onClick={handleSignOut}>Logout</button>
            )}
          </span>
        )}
      </div>
    </nav>
  );
}

export default Bar;
