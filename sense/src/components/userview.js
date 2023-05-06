import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { app, db_realtime } from "../firebase";

function BinStatus({ binId, onRemoveBin }) {
  const [status, setStatus] = useState("Offline");

  useEffect(() => {
    const database = getDatabase(app);
    const binStatusRef = ref(database, `bins/${binId}/status`);
    onValue(binStatusRef, (snapshot) => {
      const binStatus = snapshot.val();
      setStatus(binStatus || "Offline");
    });
  }, [binId]);

  const handleRemoveBin = () => {
    const binRef = doc(db_realtime, "bins", binId);
    deleteDoc(binRef)
      .then(() => {
        const database = getDatabase(app);
        const binStatusRef = ref(database, `bins/${binId}`);
        remove(binStatusRef);
        onRemoveBin(binId);
      })
      .catch((error) => {
        console.error("Error removing bin:", error);
      });
  };

  return (
    <tr>
      <td>{binId}</td>
      <td>{status}</td>
      <td>
        <button onClick={handleRemoveBin}>Remove</button>
      </td>
    </tr>
  );
}

function AddBin({ onAddBin }) {
  const [binId, setBinId] = useState("");
  const [secret, setSecret] = useState("");

  const handleAddBin = () => {
    const db = getFirestore(app);
    const binRef = doc(db, "bins", binId);
    setDoc(binRef, { secret })
      .then(() => {
        onAddBin(binId);
        setBinId("");
        setSecret("");
      })
      .catch((error) => {
        console.error("Error adding bin:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Bin ID"
        value={binId}
        onChange={(e) => setBinId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Secret"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />
      <button onClick={handleAddBin}>+</button>
    </div>
  );
}

function UserView() {
  const [bins, setBins] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);
    const binsCollection = collection(db, "bins");
    const unsubscribe = onSnapshot(binsCollection, (snapshot) => {
      const binIds = snapshot.docs.map((doc) => doc.id);
      setBins(binIds);
    });

    return () => unsubscribe();
  }, []);

  const handleAddBin = (binId) => {
    if (bins.includes(binId)) {
      alert("Bin already exists");
    } else {
      setBins([...bins, binId]);
    }
  };

  const handleRemoveBin = (binId) => {
    setBins(bins.filter((bin) => bin !== binId));
  };

  return (
    <div>
      <h1>BinSense</h1>
      <table>
        <thead>
          <tr>
            <th>Bin ID</th>
            <th>Bin Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bins.map((bin) => (
            <BinStatus key={bin} binId={bin} onRemoveBin={handleRemoveBin} />
          ))}
        </tbody>
      </table>
      <AddBin onAddBin={handleAddBin} />
    </div>
  );
}

export default UserView;
