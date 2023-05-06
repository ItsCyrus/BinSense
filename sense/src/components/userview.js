import React, { useEffect, useState, useContext } from "react";
import { ref, onValue } from "firebase/database";
import { db_realtime } from "../firebase";
import { AuthContext } from "../AuthContext";
import { Redirect } from "react-router-dom";

import "../styles/App.css";

function BinStatus({ binId, onRemoveBin }) {
  const [status, setStatus] = useState("Offline");

  useEffect(() => {
    const getData = ref(db_realtime, `bins/${binId}/status`);
    onValue(getData, (snapshot) => {
      const binStatus = snapshot.val();
      setStatus(binStatus || "Offline");
    });
  }, [binId]);

  const handleRemoveBin = () => {
    onRemoveBin(binId);
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
    const binRef = ref(db_realtime, `bins/${binId}/secret`);
    onValue(binRef, (snapshot) => {
      const correctSecret = snapshot.val();
      if (correctSecret === secret) {
        onAddBin(binId);
        setBinId("");
        setSecret("");
      } else {
        alert("Invalid bin ID or secret");
      }
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
  const { isAuthenticated } = useContext(AuthContext);
  const [bins, setBins] = useState([]);

  useEffect(() => {
    const storedBins = localStorage.getItem("bins");
    if (storedBins) {
      setBins(JSON.parse(storedBins));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bins", JSON.stringify(bins));
  }, [bins]);

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

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Redirect to="/login" />;
  }

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
