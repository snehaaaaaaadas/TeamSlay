import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const active = (p) => pathname === p;

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-box">TS</span>
          <span className="brand-name">TeamSlay</span>
        </Link>

        <button className="burger" onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          <li>
            <Link to="/" className={`nav-link ${active('/') ? 'active' : ''}`} onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/members" className={`nav-link ${active('/members') ? 'active' : ''}`} onClick={() => setOpen(false)}>
              Members
            </Link>
          </li>
          <li>
            <Link to="/add-member" className={`nav-cta ${active('/add-member') ? 'active' : ''}`} onClick={() => setOpen(false)}>
              + Add Member
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
