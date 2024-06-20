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
      <img className='profile' src={assets.profile_image} alt="Profile" />
    </div>
  );
};

export default Navbar;
