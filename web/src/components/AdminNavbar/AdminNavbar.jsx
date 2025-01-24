import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

function AdminNavbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#cc81bb' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">LUXENEST HOTEL</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link button-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link button-link" to="/AdminRegister">Add Admin</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link button-link" to="/AdminRoomDetails">Room Details</Link>
              </li>
             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminNavbar;
