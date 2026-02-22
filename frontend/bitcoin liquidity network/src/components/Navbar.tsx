import React from 'react';
import styles from '../styles/Navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Bitcoin Liquidity Coordination Layer</div>
      <div className={styles.navLinks}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/protocol-registry">Protocol Registry</Link>
        <Link to="/asset-registry">Asset Registry</Link>
      </div>
    </nav>
  );
}
