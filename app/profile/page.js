'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import classes from './page.module.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:8080/user/profile', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }

                const userData = await response.json();
                setUser(userData);
                setNotification(userData.notification);
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

            setNotification(!notification);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/logout', {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to log out');
            }

            window.location.href = '/login';
        } catch (error) {
            setError(error.message);
        }
    };

    const handleViewOrders = () => {
        router.push('/personal-orders');
    };

    if (loading) return <div className={classes.loading}>Loading...</div>;
    if (error) return <div className={classes.error}>{error}</div>;

    return (
        <div className={classes.container}>
            <div className={classes.profileCardWrapper}>
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
                        <i className="fa fa-power-off logoutIcon" style={{marginRight: "8px"}}></i> Logout
                    </button>
                    <button className={classes.viewOrdersButton} onClick={handleViewOrders}>
                        <i className="fa fa-list" style={{marginRight: "8px"}}></i> View Orders
                    </button>
                </div>
            </div>

            {user?.admin && (
                <div className={classes.adminPanel}>
                    <h2 className={classes.adminTitle}>Admin Panel</h2>
                    <button className={classes.adminButton} onClick={() => router.push('/admin/user-dashboard')}>
                        <i className="fa fa-users" style={{marginRight: "10px"}}></i> User Dashboard
                    </button>
                    <button className={classes.adminButton} onClick={() => router.push('/admin/ingredients-dashboard')}>
                        <i className="fa fa-clipboard" style={{marginRight: "10px"}}></i> Ingredients Dashboard
                    </button>
                    <button className={classes.adminButton} onClick={() => router.push('/admin/product-dashboard')}>
                        <i className="fa fa-cogs" style={{marginRight: "10px"}}></i> Product Dashboard
                    </button>
                    <button className={classes.adminButton} onClick={() => router.push('/admin/order-dashboard')}>
                        <i className="fa fa-shopping-cart" style={{marginRight: "10px"}}></i> Order Dashboard
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
