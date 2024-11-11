'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import classes from './header.module.css';

const Header = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for the presence of the session cookie
    const sessionCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('SESSION_ID='));
    setIsLoggedIn(!!sessionCookie); // Set to true if the cookie is found

  }, []);


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
            <li className={classes.navItem2}>
              {isLoggedIn ? (
                  // Render the profile icon when the user is logged in
                  <a href="/profile" className={classes.profileIconLink} aria-label="Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
                      <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
                    </svg>
                  </a>
              ) : (
                  // Render the "Login" link when the user is not logged in
                  <a href="/login" className={`${classes.navLink} ${pathname === '/login' ? classes.active : ''}`}>Login</a>
              )}
            </li>
          </ul>
        </nav>
      </header>
  );
};

export default Header;
