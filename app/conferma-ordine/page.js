"use client";
import {useState, useEffect} from "react";
import classes from "@/app/conferma-ordine/page.module.css"
import Link from "next/link";

export default function Page() {
    const [comment, setComment] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [pickupTime, setPickupTime] = useState("");
    const [orderList, setOrderList] = useState([]);
    const [occupiedTimes, setOccupiedTimes] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const availableTimes = ["08:00", "08:10", "08:20", "08:30", "08:40", "08:50",
        "09:00", "09:10", "09:20", "09:30", "09:40", "09:50",
        "10:00", "10:10", "10:20", "10:30", "10:40", "10:50",
        "11:00", "11:10", "11:20", "11:30", "11:40", "11:50",
        "12:00", "12:10", "12:20", "12:30", "12:40", "12:50",
        "13:00",
        "14:30", "14:40", "14:50",
        "15:00", "15:10", "15:20", "15:30", "15:40", "15:50",
        "16:00", "16:10", "16:20", "16:30", "16:40", "16:50",
        "17:00", "17:10", "17:20", "17:30", "17:40", "17:50",
        "18:00", "18:10", "18:20", "18:30", "18:40", "18:50",
        "19:00"];

    // Funzione per recuperare gli orari occupati
    const fetchOccupiedTimes = async (date) => {
        try {
            const response = await fetch(`http://localhost:8080/orders/times?date=${date}`, {
                method: "GET",
                headers: {
                    "Content-Type": "text/plain",
                },
            });

            if (response.ok) {
                const data = await response.text();
                console.log(data);
                const times = JSON.parse(data);
                setOccupiedTimes(times);
            } else {
                console.error("Errore nel recuperare gli orari occupati.");
            }
        } catch (error) {
            console.error("Errore di fetch:", error);
        }
    };

    // Gestore per il cambio data
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setPickupDate(selectedDate);
        if (selectedDate) {
            fetchOccupiedTimes(selectedDate);
        }
    };

    // Recupera l'ordine dal localStorage
    useEffect(() => {
        const storedOrderList = localStorage.getItem("orderList");
        if (storedOrderList) {
            const parsedOrderList = JSON.parse(storedOrderList);
            console.log("Order List from localStorage:", parsedOrderList);
            setOrderList(parsedOrderList);
        }
    }, []);

    // Gestore per l'invio dell'ordine
    const handleSubmitOrder = async () => {
        if (!pickupDate || !pickupTime) {
            setFeedbackMessage("Inserisci una data e un orario.")
            setShowPopup(true);
            return;
        }

        const pickupDateTime = `${pickupDate}T${pickupTime}`;
        const orderData = {
            content: orderList.map((item) => ({
                productId: item.id,
                quantity: item.quantitySelected,
            })),
            pickup: pickupDateTime,
            comment: comment,
        };

        try {
            console.log("Order Data:", orderData);
            const response = await fetch("http://localhost:8080/orders", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                setFeedbackMessage("Ordine inviato!");
                setShowPopup(true);
                localStorage.removeItem("orderList");
                setOrderList([]);
                setPickupDate("");
                setPickupTime("");
                setComment("");
            } else {
                setFeedbackMessage("Errore durante l'invio. Prova prima a fare Login!");
                setShowPopup(true);
            }
        } catch (error) {
            console.error("Errore nell'invio:", error);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setFeedbackMessage("");
    };


    return (
        <div className={classes.root}>
            <h1>Conferma Ordine</h1>
            <div className={classes.container}>
                <div className={classes.summary}>
                    <h3 className={classes.title}>Carrello</h3>
                    <ul className={classes.listItem}>
                        {orderList.map((item, index) => (
                            <li key={index}>
                                {item.productName} - {item.quantitySelected} x {item.price}€
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={classes.formContainer}>
                    <h3 className={classes.title}>Form per l'ordine</h3>
                    <div className={classes.form}>
                        <div className={classes.label}>
                            <label>Commento:</label>
                            <textarea
                                placeholder="Aggiungi un commento (opzionale)"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>

                        <div className={classes.label}>
                            <label>Data ritiro (obbligatorio):</label>
                            <input type="date" value={pickupDate} onChange={handleDateChange} />
                        </div>

                        <div className={classes.label}>
                            <label>Ora ritiro (obbligatorio):</label>
                            <select
                                value={pickupTime}
                                onChange={(e) => setPickupTime(e.target.value)}
                            >
                                <option value="">Seleziona un orario</option>
                                {availableTimes.map((time) => (
                                    <option key={time} value={time} disabled={occupiedTimes.includes(time)}>
                                        {time} {occupiedTimes.includes(time) && "(Occupato)"}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button className={classes.btn} onClick={handleSubmitOrder}>
                            Invia Ordine
                        </button>
                    </div>
                </div>
            </div>

            {/* Popup feedback */}
            {showPopup && (
                <div className={classes.popup}>
                    <div className={classes.popupContent}>
                        <p>{feedbackMessage}</p>
                        {feedbackMessage === "Ordine inviato!" ? (
                            <Link href="/personal-orders" className={classes.closeBtn}>
                                Vai agli ordini
                            </Link>
                        ) :
                            (
                                <button onClick={handleClosePopup} className={classes.closeBtn}>
                                    Chiudi
                                </button>
                            )}

                    </div>
                </div>
            )}
        </div>
    );
}