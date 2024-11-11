'use client';

import React, { useEffect, useState } from 'react';
import classes from './page.module.css'; // Assuming you have the styles for PersonalOrders

const PersonalOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:8080/orders/user', {
                    method: 'GET',
                    credentials: 'include', // Ensure session cookies are included
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const orderData = await response.json();

                // Sort orders by pickup date in ascending order (closest pickup date first)
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

    const handleOrderClick = (orderId) => {
        setSelectedOrder(selectedOrder === orderId ? null : orderId); // Toggle order details visibility
    };

    // Function to format the pickup date
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        if (isNaN(date)) {
            return "Invalid Date";  // In case the date is invalid
        }
        return date.toLocaleString();  // Formats the date to a readable string
    };

    if (loading) return <div className={classes.loading}>Loading...</div>;
    if (error) return <div className={classes.error}>{error}</div>;

    return (
        <div className={classes.container}>
            <h2>Your Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className={classes.ordersList}>
                    {orders.map((order) => (
                        <div key={order.id} className={classes.orderCard}>
                            <div
                                className={classes.orderSummary}
                                onClick={() => handleOrderClick(order.id)} // Use id for unique identifier
                            >
                                <h3>Order ID: {order.id}</h3> {/* Display the correct Order ID */}
                                {/* Status Word with Dynamic Color */}
                                <p style={{ color: order.status === 'pending' ? '#ffcc00' : order.status === 'cancelled' ? '#ff3333' : order.status === 'confirmed' ? '#4CAF50' : '#2196F3' }}>
                                    Status: {order.status}
                                </p>
                                {/* Use formatDate function to handle pickup date */}
                                <p>Pickup Date: {formatDate(order.pickupDate)}</p>  {/* Correctly display pickup date */}
                            </div>

                            {selectedOrder === order.id && (
                                <div className={classes.orderDetails}>
                                    <h4>Order Details</h4>
                                    <ul>
                                        {order.content.map((product) => (
                                            <li key={product.id}> {/* Ensure unique key for each product */}
                                                <strong>{product.productName}</strong> - {product.quantity} x ${product.price}
                                            </li>
                                        ))}
                                    </ul>
                                    <p>Comment: {order.comment}</p>
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
