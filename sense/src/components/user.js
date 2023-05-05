import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../firebase";

const user = () => {
  const [binStatus, setBinStatus] = useState("");
  const [user] = useAuthState(app.auth());

  return (
    <div className="user">
      <h1>User Dashboard</h1>
      {binStatus === 0 ? (
        <p>Your bin is full. Please empty it.</p>
      ) : (
        <p>Your bin is not full. Keep filling it.</p>
      )}
    </div>
  );
};

export default user;
