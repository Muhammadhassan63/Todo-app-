import React from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.scss'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link> {/* Use Link component for internal navigation */}
        </li>
        <li className="nav-item">
          <Link to="/description" className="nav-link">Description</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
