import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  //const [auth, setAuth] = useState<boolean>(false);
  //const [role, setRole] = useState<string | null>(null);

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">GiftShop</h1>
      <ul className={isMobile ? 'nav-links-mobile' : 'nav-links'}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/marketplace">Marketplace</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
      <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? '✖' : '☰'}
      </button>
    </nav>
  );
};

export default Navbar;