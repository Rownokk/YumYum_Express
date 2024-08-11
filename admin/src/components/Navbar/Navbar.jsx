import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to='/' className="logo">
        <div className="logo-text">
          <span className="logo-line1">YumYum</span>
          <span className="logo-line2">Express</span>
        </div>
      </Link>

      <div className="nav-links">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/orders" className="nav-link">Orders</Link>
        <Link to="/settings" className="nav-link">Settings</Link>
      </div>

      <div className="admin-controls">
        <div className="admin-greeting">Hi, Admin</div>
        <Link to="/logout" className="nav-link logout">Logout</Link>
        <img className='profile' src={assets.profile_image} alt="Profile" />
      </div>
    </div>
  );
};

export default Navbar;
