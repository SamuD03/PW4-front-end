"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt,
    faComment,
    faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

export default function OrderDashboard() {
    const [orders, setOrders] = useState([]);
    const [buyers, setBuyers] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch("http://localhost:8080/orders/admin", {
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }
                const data = await response.json();
                setOrders(data);

                // Fetch buyer names for each order
                const uniqueBuyerIds = [...new Set(data.map(order => order.idBuyer))];
                const buyerPromises = uniqueBuyerIds.map(async (buyerId) => {
                    try {
                        const res = await fetch(`http://localhost:8080/user/profile/${buyerId}`, {
                            credentials: "include",
                        });
                        if (!res.ok) {
                            throw new Error("Failed to fetch buyer details");
                        }
                        const user = await res.json();
                        return { id: buyerId, name: `${user.name} ${user.surname}` };
                    } catch {
                        return { id: buyerId, name: "Error" }; // Handle fetch error
                    }
                });

                const buyerData = await Promise.all(buyerPromises);
                const buyerMap = buyerData.reduce((acc, { id, name }) => {
                    acc[id] = name;
                    return acc;
                }, {});

                setBuyers(buyerMap);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:8080/orders/${orderId}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ status: newStatus }),
            });
            if (response.ok) {
                setOrders(
                    orders.map((order) =>
                        order.id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                throw new Error("Failed to update order status");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Order Dashboard</h1>
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.ordersGrid}>
                {orders.map((order) => (
                    <div key={order.id} className={styles.orderCard}>
                        <h2 className={styles.orderTitle}>
                            <FontAwesomeIcon icon={faCalendarAlt} /> Pickup: {order.pickupDate}
                        </h2>
                        <p className={styles.buyerDetail}>
                            <strong>Buyer:</strong> {buyers[order.idBuyer] || "Loading..."}
                        </p>
                        <p className={styles.orderDetail}>
                            <FontAwesomeIcon icon={faComment} /> <strong>Comment:</strong>{" "}
                            {order.comment || "No comment"}
                        </p>
                        <div className={styles.orderContent}>
                            <FontAwesomeIcon icon={faClipboardList} /> <strong>Content:</strong>
                            {order.content.map((item, index) => (
                                <p key={index} className={styles.contentItem}>
                                    {item.name} ({item.quantity}x - ${item.price.toFixed(2)})
                                </p>
                            ))}
                        </div>
                        <p className={styles.orderStatus}>
                            <strong>Status:</strong>{" "}
                            <select
                                value={order.status || "pending"}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                className={`${styles.statusDropdown} ${
                                    styles[order.status || "pending"]
                                }`}
                            >
                                <option className={styles.pending} value="pending">Pending</option>
                                <option className={styles.confirmed} value="confirmed">Confirmed</option>
                                <option className={styles.cancelled} value="cancelled">Cancelled</option>
                                <option className={styles.delivered} value="delivered">Delivered</option>
                            </select>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
