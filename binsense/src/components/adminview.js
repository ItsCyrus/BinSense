import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const AdminViewPage = () => {
  const { currentUser } = useAuth();
  const [bins, setBins] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const binsRef = collection(db, "bins");
    const unsubscribe = onSnapshot(binsRef, (querySnapshot) => {
      const binsData = [];
      querySnapshot.forEach((doc) => {
        binsData.push({ id: doc.id, data: doc.data() });
      });
      setBins(binsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Bin ID</th>
            <th>Bin Status</th>
          </tr>
        </thead>
        <tbody>
          {bins.map((bin) => (
            <tr key={bin.id}>
              <td>{bin.id}</td>
              <td>{bin.data.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminViewPage;
