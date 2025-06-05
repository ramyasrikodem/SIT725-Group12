import React, { useEffect, useState } from 'react';
import API from '../../services/api';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    API.get('/admin/users').then(res => setUsers(res.data));
    API.get('/admin/stats').then(res => setStats(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Admin Dashboard</h3>
      <div className="mb-3">
        <p><strong>Total Scans:</strong> {stats.total_scans}</p>
        <p><strong>Fake:</strong> {stats.fake_count}</p>
        <p><strong>Real:</strong> {stats.real_count}</p>
      </div>
      <h5>Users</h5>
      <ul className="list-group">
        {users.map(u => (
          <li key={u.id} className="list-group-item">{u.email} ({u.role})</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
