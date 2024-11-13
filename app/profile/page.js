'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPowerOff,
    faList,
    faUser,
    faEnvelope,
    faPhone,
    faBell,
    faUsers,
    faClipboard,
    faCogs,
    faShoppingCart,
    faIdBadge,
} from '@fortawesome/free-solid-svg-icons';
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
                toast.error(error.message);
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
            toast.success(
                notification
                    ? 'Notifications have been turned off'
                    : 'Notifications have been turned on'
            );
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
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

            toast.success('You have logged out successfully!');
            window.location.href = '/login';
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    const handleViewOrders = () => {
        router.push('/personal-orders');
    };

    if (loading) return (
        <div style={{
            textAlign: 'center',
            fontSize: '24px', // Increased font size
            color: '#777',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '91vh',
            fontWeight: 'bold',
            background: "url('/sfondoprofilo.png') no-repeat center center",
            backgroundSize: 'cover'
        }}>
            Loading...
        </div>
    );
    if (error) return <div className={classes.error}>{error}</div>;

    return (
        <div className={classes.container}>
            <ToastContainer/>
            <div className={classes.profileCardWrapper}>
                <div className={classes.profileCard}>
                    <h2>Profile Information</h2>
                    <div className={classes.profileField}>
                <span className={classes.profileLabel}>
                    <FontAwesomeIcon icon={faUser} style={{marginRight: '8px'}}/> Name:
                </span>
                        <span className={classes.profileValue}>{user.name}</span>
                    </div>
                    <div className={classes.profileField}>
                <span className={classes.profileLabel}>
                    <FontAwesomeIcon icon={faIdBadge} style={{marginRight: '8px'}}/> Surname:
                </span>
                        <span className={classes.profileValue}>{user.surname}</span>
                    </div>
                    <div className={classes.profileField}>
                <span className={classes.profileLabel}>
                    <FontAwesomeIcon icon={faEnvelope} style={{marginRight: '8px'}}/> Email:
                </span>
                        <span className={classes.profileValue}>{user.email || 'N/A'}</span>
                    </div>
                    <div className={classes.profileField}>
                <span className={classes.profileLabel}>
                    <FontAwesomeIcon icon={faPhone} style={{marginRight: '8px'}}/> Phone:
                </span>
                        <span className={classes.profileValue}>{user.number || 'N/A'}</span>
                    </div>
                    <div className={classes.profileField}>
                <span className={classes.profileLabel}>
                    <FontAwesomeIcon icon={faBell} style={{marginRight: '8px'}}/> Notification:
                </span>
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
                        <FontAwesomeIcon icon={faPowerOff} style={{marginRight: '8px'}}/> Logout
                    </button>
                    <button className={classes.viewOrdersButton} onClick={handleViewOrders}>
                        <FontAwesomeIcon icon={faList} style={{marginRight: '8px'}}/> View Orders
                    </button>
                </div>
            </div>

            {user?.admin && (
                <div className={classes.adminPanel}>
                    <h2 className={classes.adminTitle}>Admin Panel</h2>
                    <button className={classes.adminButton} onClick={() => router.push('/admin/user-dashboard')}>
                        <FontAwesomeIcon icon={faUsers} style={{marginRight: '10px'}}/> User Dashboard
                    </button>
                    <button className={classes.adminButton} onClick={() => router.push('/admin/ingredients-dashboard')}>
                        <FontAwesomeIcon icon={faClipboard} style={{marginRight: '10px'}}/> Ingredients Dashboard
                    </button>
                    <button className={classes.adminButton} onClick={() => router.push('/admin/product-dashboard')}>
                        <FontAwesomeIcon icon={faCogs} style={{marginRight: '10px'}}/> Product Dashboard
                    </button>
                    <button className={classes.adminButton} onClick={() => router.push('/admin/order-dashboard')}>
                        <FontAwesomeIcon icon={faShoppingCart} style={{marginRight: '10px'}}/> Order Dashboard
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;