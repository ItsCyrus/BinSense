import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/Bar.css";

function Bar() {
  const history = useHistory();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isLoginOrSignupPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        history.push("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
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
    <nav className="navbar">
      <Link to="/" className="navbar-title">
        BinSense
      </Link>

      <div className="navbar-content">
        {!isLoginOrSignupPage && (
          <span>
            {isHomePage ? (
              <>
                <Link to="/signup" className="navbar-link">
                  Signup
                </Link>
                <LoginLink />
              </>
            ) : (
              <button className="navbar-button" onClick={handleSignOut}>
                Logout
              </button>
            )}
          </span>
        )}
      </div>
    </nav>
  );
}

export default Bar;
