"use client";
import React from 'react';
import styles from './page.module.css';

export default function VerifyEmail() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.verifiedText}>EMAIL VERIFIED</h1>
                <a href="/login" className={styles.loginButton}>
                    Login
                </a>
            </div>
        </div>
    );
}
