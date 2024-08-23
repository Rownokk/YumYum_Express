import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Navbar = ({ onSignIn, isSignedIn }) => {
  const [showSignIn, setShowSignIn] = useState(!isSignedIn); // Show sign-in form if not signed in
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    // Replace with actual sign-in logic
    if (username && email) {
      setShowSignIn(false);
      onSignIn(true); // Notify parent component about successful sign-in
    }
  };

  const handleLogout = () => {
    // Replace with actual logout logic
    setShowSignIn(true);
    onSignIn(false); // Notify parent component about logout
  };

  return (
    <div className='navbar'>
      {isSignedIn ? (
        <>
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
            <Link to="/logout" className="nav-link logout" onClick={handleLogout}>Logout</Link>
           
          </div>
        </>
      ) : (
        <div className="sign-in-form">
          <h3>Sign In</h3>
          <form onSubmit={handleSignIn}>
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <button type="submit">Sign In</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Navbar;
