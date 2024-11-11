'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // Import useRouter from 'next/navigation'
import classes from './page.module.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter(); // Initialize the router

    useEffect(() => {
        // Fetch the user profile data from the backend
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:8080/user/profile', {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }

                const userData = await response.json();
                setUser(userData);
                setNotification(userData.notification); // Set initial notification state
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const toggleNotification = async () => {
        try {
            const response = await fetch('http://localhost:8080/user/notifications', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ notification: !notification }),
            });

            if (!response.ok) {
                throw new Error('Failed to update notification preference');
            }

            setNotification(!notification); // Toggle notification state
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/logout', {
                method: 'DELETE',
                credentials: 'include', // Include cookies in the request
            });

            if (!response.ok) {
                throw new Error('Failed to log out');
            }

            // Redirect to the login page after successful logout
            window.location.href = '/login';
        } catch (error) {
            setError(error.message);
        }
    };

    const handleViewOrders = () => {
        router.push('/personal-orders'); // Navigate to the PersonalOrders page
    };

    if (loading) return <div className={classes.loading}>Loading...</div>;
    if (error) return <div className={classes.error}>{error}</div>;

    return (
        <div className={classes.container}>
            {user ? (
                <div className={classes.profileCard}>
                    <h2>Profile Information</h2>
                    <div className={classes.profileField}>
                        <span className={classes.profileLabel}>Name:</span>
                        <span className={classes.profileValue}>{user.name}</span>
                    </div>
                    <div className={classes.profileField}>
                        <span className={classes.profileLabel}>Surname:</span>
                        <span className={classes.profileValue}>{user.surname}</span>
                    </div>
                    <div className={classes.profileField}>
                        <span className={classes.profileLabel}>Email:</span>
                        <span className={classes.profileValue}>{user.email || 'N/A'}</span>
                    </div>
                    <div className={classes.profileField}>
                        <span className={classes.profileLabel}>Phone:</span>
                        <span className={classes.profileValue}>{user.number || 'N/A'}</span>
                    </div>
                    <div className={classes.profileField}>
                        <span className={classes.profileLabel}>Notification:</span>
                        <label className={classes.toggleSwitch}>
                            <input
                                type="checkbox"
                                checked={notification}
                                onChange={toggleNotification}
                            />
                            <span className={classes.slider}></span>
                        </label>
                    </div>
                    <button className={classes.logoutButton} onClick={handleLogout}>
                        Logout
                    </button>
                    <button className={classes.viewOrdersButton} onClick={handleViewOrders}>
                        View Orders
                    </button>
                </div>
            ) : (
                <div className={classes.error}>No user data available</div>
            )}
        </div>
    );
};

export default ProfilePage;
