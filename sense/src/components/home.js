import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div>
      <div className="homepage-container">
        <div className="homepage-section">
          <div className="homepage-section-content">
            <img
              className="homepage-section-image"
              src="image1.jpg"
              alt="Section 1"
            />
            <h2 className="homepage-section-title">Efficient Dustbin Management</h2>
            <p className="homepage-section-description">
              Welcome to BinSense, the smart dustbin management system. With
              BinSense, you can efficiently manage and monitor dustbins in your
              area. Stay connected with the cleanliness of your neighborhood by
              subscribing to dustbins and receiving real-time updates on their
              status.
            </p>
            <Link to="/signup" className="homepage-section-button">
              Sign Up Now
            </Link>
          </div>
        </div>

        <div className="homepage-section homepage-section-reversed">
          <div className="homepage-section-content">
            <img
              className="homepage-section-image"
              src="image2.jpg"
              alt="Section 2"
            />
            <h2 className="homepage-section-title">User-Friendly Interface</h2>
            <p className="homepage-section-description">
              Users can easily check if a dustbin is empty or full, helping them
              make informed decisions before disposing of their waste. The system
              empowers residents to contribute to a cleaner environment by promoting
              responsible waste management practices.
            </p>
            <Link to="/login" className="homepage-section-button">
              Login
            </Link>
          </div>
        </div>

        <div className="homepage-section">
          <div className="homepage-section-content">
            <img
              className="homepage-section-image"
              src="image3.jpg"
              alt="Section 3"
            />
            <h2 className="homepage-section-title">Advanced Admin Features</h2>
            <p className="homepage-section-description">
              BinSense also offers advanced features for administrators. Admins have
              access to a comprehensive dashboard where they can view and manage all
              the dustbins in the system. They can schedule pickup routes, assign
              tasks to collection teams, and track the overall efficiency of the
              waste management process.
            </p>
            <Link to="/login" className="homepage-section-button">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
