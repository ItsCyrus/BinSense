import { useEffect, useState } from 'react';
import { db_realtime } from "../firebase";
import { ref, onValue } from 'firebase/database';

function BinStatus({ binId, status }) {
  return (
    <tr>
      <td>{binId}</td>
      <td>{status}</td>
    </tr>
  );
}

function UserSubscription({ userId, subscriptions, onRemoveSubscription }) {
  return (
    <tr>
      <td>{userId}</td>
      <td>{subscriptions.join(', ')}</td>
      <td>
        <button onClick={() => onRemoveSubscription(userId)}>Remove</button>
      </td>
    </tr>
  );
}

function AdminView() {
  const [bins, setBins] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const binsRef = ref(db_realtime, 'bins');
    onValue(binsRef, (snapshot) => {
      const binData = snapshot.val();
      if (binData) {
        const binList = Object.entries(binData).map(([binId, bin]) => ({
          binId,
          status: bin.status || 'Offline',
        }));
        setBins(binList);
      } else {
        setBins([]);
      }
    });

    const usersRef = ref(db_realtime, 'users');
    onValue(usersRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        const userList = Object.entries(userData).map(([userId, user]) => ({
          userId,
          subscriptions: user.subscriptions || [],
        }));
        setUsers(userList);
      } else {
        setUsers([]);
      }
    });
  }, []);

  const handleRemoveSubscription = (userId) => {
    // Implement the logic to remove the subscription for the user
    // You can update the Firestore or perform any other necessary actions here
    console.log(`Removing subscription for user ${userId}`);
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
            <UserSubscription
              key={user.userId}
              userId={user.userId}
              subscriptions={user.subscriptions}
              onRemoveSubscription={handleRemoveSubscription}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminView;
