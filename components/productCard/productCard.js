"use client";
import { useState } from "react";
import classes from "./productCard.module.css";
import Image from "next/image";
import placeholder from "@/public/placeholder.png"

export default function ProductCard({ product, addToOrderList }) {
    const { id, productName, description, price, quantity, url } = product;
    const [quantitySelected, setQuantitySelected] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const handleIncrease = () => {
        if (quantitySelected < quantity) {
            setQuantitySelected((prev) => prev + 1);
        }
    };

    const handleDecrease = () => {
        if (quantitySelected > 0) {
            setQuantitySelected((prev) => prev - 1);
        }
    };

    const handleAddToCart = () => {
        if (quantitySelected > 0) {
            addToOrderList({ id, productName, price, quantitySelected });
            setQuantitySelected(0); // Reset quantity after adding
            setFeedbackMessage("");
        } else {
            setFeedbackMessage("Please select a quantity greater than zero.")
        }
    };

    return (
        <div className={classes.card}>
            {url != "nan" ? (
                <Image src={url} alt={"img_"+ productName}/>
            ):(
                <Image src={placeholder} alt={"product_img"}/>
            )}

            <h4>{productName}</h4>
            <p>{description}</p>
            <p>Price: €{price.toFixed(2)}</p>
            <div className={classes.quantity}>
                <svg onClick={handleDecrease}
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512">
                    <path
                        d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                </svg>
                <span>{quantitySelected}</span>
                <svg onClick={handleIncrease}
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512">
                    <path
                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
                </svg>
            </div>
            <button className={classes.btn} onClick={handleAddToCart}>
                Add to Order
            </button>

            {/* Mostra il messaggio di feedback */}
            {feedbackMessage && (
                <div className={classes.errorMessage}>
                    {feedbackMessage}
                </div>
            )}
        </div>
    );
}
