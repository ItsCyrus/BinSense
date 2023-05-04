import React from 'react';

const home = () => {
  return (
    <div>
      <h1>Welcome to the Smart Dustbin System</h1>
      <p>Please log in to access the system</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default home;