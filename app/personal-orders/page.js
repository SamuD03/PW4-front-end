'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { faCheck, faClock, faFilter, faTimes, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PersonalOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const statusIcons = {
        pending: faClock,
        confirmed: faCheck,
        cancelled: faTimes,
        delivered: faTruck,
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:8080/orders/user', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const orderData = await response.json();
                const sortedOrders = orderData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                setOrders(sortedOrders);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOrderClick = (orderId) => {
        setSelectedOrder(selectedOrder === orderId ? null : orderId);
    };

    const handleStatusFilterChange = (status) => {
        setSelectedStatuses((prevStatuses) =>
            prevStatuses.includes(status)
                ? prevStatuses.filter((s) => s !== status)
                : [...prevStatuses, status]
        );
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:8080/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'cancelled' }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to cancel order');
            }

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, status: 'cancelled' } : order
                )
            );

            toast.success('Order cancelled successfully!');
        } catch (error) {
            setError(error.message);
        }
    };

    const filteredOrders = orders.filter((order) =>
        selectedStatuses.length === 0 || selectedStatuses.includes(order.status)
    );

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        if (isNaN(date)) {
            return "Invalid Date";
        }
        return date.toLocaleString();
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={`${styles.container} ${filteredOrders.length < 3 ? styles.extraPadding : ''}`}>
            <ToastContainer />
            <h1>Your Orders</h1>
            <div className={styles.actions}>
                <div className={styles.filterDropdown}>
                    <button className={styles.filterButton} onClick={toggleDropdown}>
                        <FontAwesomeIcon icon={faFilter} /> Filter Orders
                    </button>
                    {dropdownOpen && (
                        <div className={styles.dropdownContent}>
                            {["pending", "confirmed", "cancelled", "delivered"].map((status) => (
                                <label key={status} className={styles.dropdownItem}>
                                    <input
                                        type="checkbox"
                                        checked={selectedStatuses.includes(status)}
                                        onChange={() => handleStatusFilterChange(status)}
                                    />
                                    <FontAwesomeIcon icon={statusIcons[status]} />
                                    <span className={styles[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {filteredOrders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className={styles.ordersList}>
                    {filteredOrders.map((order) => (
                        <div key={order.id} className={styles.orderCard}>
                            <div
                                className={styles.orderSummary}
                                onClick={() => handleOrderClick(order.id)}
                            >
                                <h3>Order ID: {order.id}</h3>
                                <p style={{
                                    color: order.status === 'pending' ? '#ffcc00' :
                                        order.status === 'cancelled' ? '#ff3333' :
                                            order.status === 'confirmed' ? '#4CAF50' : '#2196F3'
                                }}>
                                    Status: {order.status}
                                </p>
                                <p>Pickup Date: {formatDate(order.pickupDate)}</p>
                            </div>
                            {selectedOrder === order.id && (
                                <div className={styles.orderDetails}>
                                    <h4>Order Details</h4>
                                    <ul>
                                        {order.content.map((product) => (
                                            <li key={product.id}>
                                                <strong>{product.productName}</strong> - {product.quantity} x ${product.price}
                                            </li>
                                        ))}
                                    </ul>
                                    <p>Comment: {order.comment}</p>
                                    {order.status === 'pending' && (
                                        <button
                                            className={styles.cancelButton}
                                            onClick={() => handleCancelOrder(order.id)}
                                        >
                                            Cancel Order
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PersonalOrders;