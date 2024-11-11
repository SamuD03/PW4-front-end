'use client';

import { useState } from "react";
import classes from './page.module.css';

export default function VerifyOtp() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false); // Stato per il caricamento

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);  // Inizio caricamento

        try {
            const response = await fetch("http://localhost:8080/auth/send-phone-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ number: phoneNumber }),
                credentials: "include",
            });

            setLoading(false);  // Fine caricamento

            if (response.ok) {
                setOtpSent(true);
                alert("OTP inviato!");
            } else {
                const errorData = await response.json();
                setError(`Errore: ${errorData.message}`);
            }
        } catch (error) {
            setLoading(false);  // Fine caricamento
            console.error("Errore di connessione:", error);
            setError("Errore di connessione al server.");
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);  // Inizio caricamento

        try {
            const response = await fetch("http://localhost:8080/auth/verify-phone", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ number: phoneNumber, otp }),
                credentials: "include",
            });

            setLoading(false);  // Fine caricamento

            if (response.ok) {
                alert("Numero verificato con successo!");
                window.location.href = "/login";  // Redirige alla pagina di login
            } else {
                const errorData = await response.json();
                setError(`Errore: ${errorData.message}`);
            }
        } catch (error) {
            setLoading(false);  // Fine caricamento
            console.error("Errore di connessione:", error);
            setError("Errore di connessione al server.");
        }
    };

    return (
        <div className={classes.container}>
            <h2>Verifica il tuo Numero di Telefono</h2>
            {error && <p className={classes.error}>{error}</p>}

            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
                <label htmlFor="phoneNumber">Numero di Telefono</label>
                <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />

                {otpSent && (
                    <>
                        <label htmlFor="otp">OTP</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </>
                )}

                <button type="submit" className={classes.submitButton} disabled={loading}>
                    {loading ? "Caricamento..." : otpSent ? "Verifica OTP" : "Invia OTP"}
                </button>
            </form>
        </div>
    );
}
