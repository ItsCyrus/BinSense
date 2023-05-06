import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/Home.css";

const Home = () => {
  return (
    <div>
      <div className="homepage-container">
        <h1 className="homepage-title">BinSense</h1>
        <p className="homepage-description">
          Welcome to BinSense, the smart dustbin management system. With
          BinSense, you can efficiently manage and monitor dustbins in your
          area. Stay connected with the cleanliness of your neighborhood by
          subscribing to dustbins and receiving real-time updates on their
          status.
        </p>
        <p className="homepage-description">
          Users can easily check if a dustbin is empty or full, helping them
          make informed decisions before disposing of their waste. The system
          empowers residents to contribute to a cleaner environment by promoting
          responsible waste management practices.
        </p>
        <p className="homepage-description">
          BinSense also offers advanced features for administrators. Admins have
          access to a comprehensive dashboard where they can view and manage all
          the dustbins in the system. They can schedule pickup routes, assign
          tasks to collection teams, and track the overall efficiency of the
          waste management process.
        </p>
        <div className="homepage-buttons">
          <Link to="/login" className="homepage-button">
            Login
          </Link>
          <Link to="/signup" className="homepage-button">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
