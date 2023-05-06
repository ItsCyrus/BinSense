import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "./firebase";
import "./styles/App.css";

const db = getDatabase(app);

function BinStatus({ binId }) {
  const [status, setStatus] = useState("Offline");

  useEffect(() => {
    const getData = ref(db, `/bins/${binId}/status`);
    onValue(getData, (snapshot) => {
      const binStatus = snapshot.val();
      setStatus(binStatus || "Offline");
    });
  }, [binId]);

  return <td>{status}</td>;
}

function AddBin({ onAddBin }) {
  const [binId, setBinId] = useState("");
  const [secret, setSecret] = useState("");

  const handleAddBin = () => {
    // Verify bin ID and secret
    const binRef = ref(db, `/bins/${binId}/secret`);
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

function App() {
  const [bins, setBins] = useState([]);

  const handleAddBin = (binId) => {
    setBins([...bins, binId]);
  };

  return (
    <div>
      <h1>BinSense</h1>
      <table>
        <thead>
          <tr>
            <th>Bin ID</th>
            <th>Bin Status</th>
          </tr>
        </thead>
        <tbody>
          {bins.map((bin) => (
            <tr key={bin}>
              <td>{bin}</td>
              <BinStatus binId={bin} />
            </tr>
          ))}
        </tbody>
      </table>
      <AddBin onAddBin={handleAddBin} />
    </div>
  );
}

export default App;
