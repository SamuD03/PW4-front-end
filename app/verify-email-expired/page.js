"use client";
import React from 'react';
import styles from './page.module.css';

export default function VerifyEmail() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.verifiedText}>Link Expired</h1>
                <p>Try again to log in to receive another verification email</p>
                <a href="/login" className={styles.loginButton}>
                    Login
                </a>
            </div>
        </div>
    );
}
