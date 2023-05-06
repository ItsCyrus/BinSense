import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const isLoginOrSignupPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav>
      <Link to="/" className="navbar-title">
        BinSense
      </Link>

      <div className="navbar-content">
        {!isLoginOrSignupPage && <span>{isHomePage ? <LoginLink /> : <LogoutLink />}</span>}
      </div>
    </nav>
  );
}

// Login link component
function LoginLink() {
  return (
    <Link to="/login" className="navbar-link">
      Login
    </Link>
  );
}

// Logout link component
function LogoutLink() {
  return (
    <Link to="/" className="navbar-link">
      Logout
    </Link>
  );
}

export default Navbar;
