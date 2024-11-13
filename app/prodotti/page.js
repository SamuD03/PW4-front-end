"use client"
import { useEffect, useState } from "react";
import ProductCard from "@/components/productCard/ProductCard"; // Ensure the path is correct
import classes from "./page.module.css";
import Link from "next/link";

export default function Page() {
    const [products, setProducts] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch data on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/product", {
                    method: "GET",
                    credentials: "include", // If needed for cookies/sessions
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                console.log("Fetched products:", data); // Log the data to check structure
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Run only once when the component mounts

    const addToOrderList = (product) => {
        setOrderList((prevList) => [...prevList, product]);
    };

    const handleGoToConfirmOrder = () => {
        localStorage.setItem('orderList', JSON.stringify(orderList));
    };

    return (
        <div className={classes.productPage}>
            <h1>Our Products</h1>

            {loading && <h3>Loading...</h3>}
            {error && <p>Error: {error}</p>}

            <div className={classes.container}>
                {orderList.length > 0 &&(
                    <Link href={"/conferma-ordine"} className={classes.cart} onClick={handleGoToConfirmOrder}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 576 512">
                            <path
                                d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                        </svg>
                        <span>{orderList.length}</span>
                    </Link>
            )
            }

            <div className={classes.cardContainer}>
                {/* Map over products to generate ProductCard components */}
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} addToOrderList={addToOrderList}/>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
            </div>

        </div>
    );
}
