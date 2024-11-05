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
            <a href="/torte" className={`${classes.navLink} ${pathname === '/torte' ? classes.active : ''}`}>Torte</a>
          </li>
          <li className={classes.navItem}>
            <a href="/contatti" className={`${classes.navLink} ${pathname === '/contatti' ? classes.active : ''}`}>Contatti</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;