import React, { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

const user = () => {
  const { currentUser } = useAuth();
  const [binStatus, setBinStatus] = useState("");

  useEffect(() => {
    const db = getFirestore();
    const binRef = doc(db, "bins", currentUser.uid);
    const unsubscribe = onSnapshot(binRef, (doc) => {
      if (doc.exists()) {
        setBinStatus(doc.data().status);
      } else {
        console.log("No bin found");
      }
    });

    return () => unsubscribe();
  }, [currentUser.uid]);

  return (
    <div>
      <h1>User Dashboard</h1>
      {binStatus === "full" ? (
        <p>Your bin is full. Please empty it.</p>
      ) : (
        <p>Your bin is not full. Keep filling it.</p>
      )}
    </div>
  );
};

export default user;
