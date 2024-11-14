"use client";
import { useState, useEffect } from "react";
import {toast} from "react-toastify";
import classes from "./productCard.module.css";
import "react-toastify/dist/ReactToastify.css";

const DEFAULT_IMAGE = '/placeholder.png'

export default function ProductCard({ product, addToOrderList, showIngredients}) {
    const { id, productName, description, price, quantity, ingredients, url } = product;
    const [quantitySelected, setQuantitySelected] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [imageURL, setImageURL] = useState(DEFAULT_IMAGE);

    useEffect(() => {
        // Set the image URL or use placeholder if the url is "nan"
        setImageURL(url && url !== "nan" ? url : DEFAULT_IMAGE);
    }, []);

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
            toast.success(`${productName} aggiunto al carrello`)
        } else {
            setFeedbackMessage("Please select a quantity greater than zero.");
        }
    };

    return (
        <div className={classes.card}>
            <div className={classes.image}>
                    <img
                        src={imageURL}
                        alt={"img_" + productName} />
            </div>

                <h4>{productName}</h4>
                <p>{description}</p>
                <button  className={classes.btn} onClick={() => showIngredients(id)}>
                    Ingredienti
                </button>

            <p>Price: €{price.toFixed(2)}</p>
            <div className={classes.quantity}>
                <svg
                    onClick={handleDecrease}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                >
                <path
                            d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                    </svg>
                    <span>{quantitySelected}</span>
                    <svg
                        onClick={handleIncrease}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path
                            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
                    </svg>
                </div>
            {quantitySelected === quantity && (
                <p>Max diponibile</p>
            )}
                <button className={classes.btn} onClick={handleAddToCart}>
                    Add to Order
                </button>

            {feedbackMessage && (
                <div className={classes.errorMessage}>{feedbackMessage}</div>
            )}
        </div>
    );
}
