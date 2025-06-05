import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Deepfake Detector</Link>
      <div className="collapse navbar-collapse">
        {loggedIn && (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/upload">Upload</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/reports">Reports</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
            <li className="nav-item"><button className="btn btn-sm btn-outline-light ms-3" onClick={logout}>Logout</button></li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
