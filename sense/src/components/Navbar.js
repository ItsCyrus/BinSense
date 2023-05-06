import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";

// Logout link component
function LogoutLink() {
  const handleLogout = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        // Sign-out successful
      })
      .catch((error) => {
        // An error happened
      });
  };

  return (
    <Link to="/" className="navbar-link" onClick={handleLogout}>
      Logout
    </Link>
  );
}

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isLoginOrSignupPage =
    location.pathname === "/login" || location.pathname === "/signup";

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
          <span>{isHomePage ? <LoginLink /> : <LogoutLink />}</span>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
