"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faUsers,
    faEnvelope,
    faPhone,
    faUser,
    faCheckCircle,
    faBell,
    faShieldAlt,
    faToggleOn,
    faToggleOff,
    faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserDashboard() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isAdminView, setIsAdminView] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(`http://localhost:8080/admin/users/${isAdminView}`, {
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, [isAdminView]);

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/user/${userId}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (response.ok) {
                setUsers(users.filter((user) => user.id !== userId));
                toast.success("User deleted successfully!");
            } else {
                throw new Error("Failed to delete user");
            }
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        }
    };

    const toggleUserProperty = async (userId, property) => {
        try {
            const user = users.find((user) => user.id === userId);
            const updatedValue = !user[property];
            const response = await fetch(`http://localhost:8080/user/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ [property]: updatedValue }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update ${property} status`);
            }

            setUsers(
                users.map((user) =>
                    user.id === userId ? { ...user, [property]: updatedValue } : user
                )
            );
            toast.success(`User ${property} status updated successfully!`);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        }
    };

    if (loading) return (
        <div className={styles.loading}>
            Loading...
        </div>
    );

    // Filter users based on isAdminView state
    const filteredUsers = users.filter(user => user.admin === isAdminView);

    // Determine dynamic padding based on the number of user cards
    const containerStyle = {
        padding:
            filteredUsers.length === 0
                ? "370px"
                : filteredUsers.length <= 6
                    ? "200px"
                    : filteredUsers.length <= 12
                        ? "150px"
                        : "20px",
    };

    return (
        <div className={styles.container} style={containerStyle}>
            <h1 className={styles.title}>User Dashboard</h1>
            {error && <p className={styles.error}>{error}</p>}

            <button
                className={styles.switchButton}
                onClick={() => {
                    setIsAdminView(!isAdminView);
                    toast.success(isAdminView ? "Switched to user list" : "Switched to admin list");
                }}
            >
                <FontAwesomeIcon icon={faUsers}/>
                {isAdminView ? "Show Normal Users" : "Show Admin Users"}
            </button>

            {filteredUsers.length === 0 ? (
                <p className={styles.noUsers}>No users</p>
            ) : (
                <div className={styles.userGrid}>
                    {filteredUsers.map((user, index) => (
                        <div key={index} className={styles.userCard}>
                            <h2 className={styles.userName}>
                                <FontAwesomeIcon icon={faUser}/> {user.name} {user.surname}
                            </h2>
                            <p className={styles.userDetail}>
                                <FontAwesomeIcon icon={faIdCard}/> ID: {user.id}
                            </p>
                            <p className={styles.userDetail}>
                                <FontAwesomeIcon icon={faEnvelope}/> Email: {user.email || "N/A"}
                            </p>
                            <p className={styles.userDetail}>
                                <FontAwesomeIcon icon={faPhone}/> Phone: {user.number || "N/A"}
                            </p>
                            <p className={styles.userDetail}>
                                <FontAwesomeIcon icon={faShieldAlt}/> Admin: {user.admin ? "Yes" : "No"}
                                <button
                                    className={styles.toggleButton}
                                    onClick={() => toggleUserProperty(user.id, "admin")}
                                >
                                    <FontAwesomeIcon icon={user.admin ? faToggleOn : faToggleOff}/>
                                </button>
                            </p>
                            <p className={styles.userDetail}>
                                <FontAwesomeIcon icon={faCheckCircle}/> Verified: {user.verified ? "Yes" : "No"}
                                <button
                                    className={styles.toggleButton}
                                    onClick={() => toggleUserProperty(user.id, "verified")}
                                >
                                    <FontAwesomeIcon icon={user.verified ? faToggleOn : faToggleOff}/>
                                </button>
                            </p>
                            <p className={styles.userDetail}>
                                <FontAwesomeIcon icon={faBell}/> Notification: {user.notification ? "Enabled" : "Disabled"}
                            </p>
                            <button className={styles.deleteButton} onClick={() => handleDelete(user.id)}>
                                <FontAwesomeIcon icon={faTrash}/> Delete User
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <ToastContainer/>
        </div>
    );
}