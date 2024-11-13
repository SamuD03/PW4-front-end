'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import classes from './header.module.css';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={classes.headerContainer}>
      <nav className={classes.header}>
        <ul className={classes.navList}>
          <li className={classes.navItem}>
            <a href="/" className={`${classes.navLink} ${pathname === '/' ? classes.active : ''}`}>Home</a>
          </li>
          <li className={classes.navItem}>
            <a href="/prodotti" className={`${classes.navLink} ${pathname === '/prodotti' ? classes.active : ''}`}>Prodotti</a>
          </li>
          <li className={classes.navItem}>
            <a href="/contatti" className={`${classes.navLink} ${pathname === '/contatti' ? classes.active : ''}`}>Contatti</a>
          </li>
          <li className={classes.navItem2}>
            <a href="/login" className={`${classes.navLink} ${pathname === '/login' ? classes.active : ''}`}>Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;