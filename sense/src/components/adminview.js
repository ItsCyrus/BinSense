import { useEffect, useState } from "react";
import { db, db_realtime } from "../firebase";
import { ref, onValue } from "firebase/database";
import { doc, updateDoc, collection, onSnapshot } from "firebase/firestore";
import "../styles/App.css";

function BinStatus({ binId, status }) {
  return (
    <tr>
      <td>{binId}</td>
      <td>{status}</td>
    </tr>
  );
}

function User({ user, onRemoveSubscription }) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.subscriptions.join(", ")}</td>
      <td>
        <button onClick={() => onRemoveSubscription(user.id)}>Remove</button>
      </td>
    </tr>
  );
}

function AdminView() {
  const [bins, setBins] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch bins from the Realtime Database
  useEffect(() => {
    const binsRef = ref(db_realtime, "bins");
    onValue(binsRef, (snapshot) => {
      const binData = snapshot.val();
      const binList = [];
      for (const binId in binData) {
        const bin = {
          binId,
          status: binData[binId].status || "Offline",
        };
        binList.push(bin);
      }
      setBins(binList);
    });
  }, []);

  // Fetch users from Firestore collection
  useEffect(() => {
    const usersCollection = collection(db, "users");
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const userList = [];
      snapshot.forEach((doc) => {
        const user = {
          id: doc.id,
          subscriptions: doc.data().subscriptions || [],
        };
        userList.push(user);
      });
      setUsers(userList);
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  const handleRemoveSubscription = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        subscriptions: [],
      });

      console.log(`Successfully removed subscription for user ${userId}`);
    } catch (error) {
      console.error("Error removing subscription:", error);
    }
  };

  return (
    <div>
      <h1>Admin View</h1>
      <h2>Bins</h2>
      <table>
        <thead>
          <tr>
            <th>Bin ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bins.map((bin) => (
            <BinStatus key={bin.binId} binId={bin.binId} status={bin.status} />
          ))}
        </tbody>
      </table>

      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Subscriptions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User
              key={user.id}
              user={user}
              onRemoveSubscription={handleRemoveSubscription}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminView;
