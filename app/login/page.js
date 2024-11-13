'use client';

import { useState } from "react";
import classes from './page.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState(""); // Stato per OTP
    const [error, setError] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [otpSent, setOtpSent] = useState(false); // Stato per il flag OTP inviato

    const validateForm = () => emailOrPhone.trim() !== "";

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) {
            setError("Per favore, inserisci un'email o un numero di telefono.");
            return;
        }

        if (emailOrPhone.includes("@")) {
            // Login tramite email
            handleLoginWithEmail();
        } else if (emailOrPhone.match(/^\+?\d+$/)) {
            // Login tramite numero di telefono
            handleLoginWithPhone();
        } else {
            setError("Inserisci un formato valido di email o numero di telefono.");
        }
    };

    const handleLoginWithEmail = async () => {
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: emailOrPhone, password }),
                credentials: "include",
            });

            if (response.ok) {
                toast.success("Login eseguito con successo!");
                const sessionCookie = document.cookie.split("; ").find(cookie => cookie.startsWith("SESSION_ID="));
                if (sessionCookie) {
                    const sessionIdValue = sessionCookie.split("=")[1];
                    setSessionId(sessionIdValue);
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 3000);// Redirige alla pagina del profilo
                }
            } else {
                const errorText = await response.text();
                console.error("Errore nella risposta del server:", errorText);
                setError(`Se il tuo account non è verificato procedi subito, un'email è stata inviata. Se il tuo account è verificato, username o password errata.`);
            }
        } catch (error) {
            console.error("Errore di rete:", error);
            setError("Errore di connessione al server.");
        }
    };

    const handleLoginWithPhone = async () => {
        try {
            const requestData = { number: emailOrPhone, password };
            console.log("Dati inviati per il login:", requestData);

            // Verifica se il numero di telefono è valido e procedi con il login
            const loginResponse = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
                credentials: "include",
            });

            // Controlla la risposta del login
            if (loginResponse.ok) {
                toast.success("Login eseguito con successo!");

                // Estrai il SESSION_ID dal cookie
                const sessionCookie = document.cookie.split("; ").find(cookie => cookie.startsWith("SESSION_ID="));
                if (sessionCookie) {
                    const sessionIdValue = sessionCookie.split("=")[1];
                    setSessionId(sessionIdValue);
                    window.location.href = "/";  // Redirige alla pagina del profilo
                }
            } else {
                // Leggi la risposta di errore come testo
                const errorText = await loginResponse.text();
                console.error("Errore nella risposta del server:", errorText);
                setError('Se il tuo account non è verificato procedi subito, qui sotto trovi il link per generare una nuova otp. Se il tuo account è verificato, username o password errata.'); // Mostra l'errore dettagliato
            }
        } catch (error) {
            console.error("Errore di connessione:", error);
            setError(`Errore di connessione al server: ${error.message}`);
        }
    };


    return (
        <>
            <div>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            </div>

            <div className={classes.container}>

                <div className={classes.formContainer}>

                    <div className={classes.form}>
                        <h2>Accedi</h2>
                        {error && <p className={classes.error}>{error}</p>}
                        {sessionId && <p className={classes.success}>Sessione attiva con ID: {sessionId}</p>}

                        <form onSubmit={handleLogin}>
                            <label htmlFor="emailOrPhone">Email o Numero di Telefono</label>
                            <input type="text" id="emailOrPhone" name="emailOrPhone" className={classes.inputField} value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} required />
                            {otpSent && (
                                <>
                                    <label htmlFor="otp">OTP</label>
                                    <input type="text" id="otp" name="otp" className={classes.inputField} value={otp} onChange={(e) => setOtp(e.target.value)} required />
                                </>
                            )}
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" className={classes.inputField} value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button type="submit" className={classes.submitButton}>
                                Login
                            </button>
                        </form>

                        <p>Non hai un account? <br /> <a href="/registrati">Registrati</a></p>
                        <p>Stai inserendo un numero non ancora verificato? <br /> <a href="/verify-otp">Verificalo ora</a></p>
                    </div>

                </div>

            </div>
        </>
    );
}
