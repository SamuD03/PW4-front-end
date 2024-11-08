'use client';

import ImmaginePrincipale from "@/components/immagine-principale/immagine-principale";
import { useState } from "react";
import classes from './page.module.css';

// Bottone
const ContactButton = () => {
    const [showNumber, setShowNumber] = useState(false);

    return (
        <button
            className={classes.callButton}
            onClick={() => setShowNumber(!showNumber)}
        >
            {showNumber ? (
                <a href="tel:+393277380932">+39 327 7380932</a>
            ) : (
                "Chiamaci"
            )}
        </button>
    );
};

export default function Login() {
    const [emailOrPhone, setEmailOrPhone] = useState(""); // Email o numero di telefono
    const [password, setPassword] = useState(""); // Password per il login via email
    const [otp, setOtp] = useState(""); // OTP per il login tramite telefono
    const [isPhoneLogin, setIsPhoneLogin] = useState(false); // Flag per determinare se il login è con telefono
    const [otpSent, setOtpSent] = useState(false); // Flag per sapere se l'OTP è stato inviato
    const [error, setError] = useState(""); // Stato per gli errori
    const [sessionId, setSessionId] = useState(""); // Stato per il sessionId

    // Invia l'OTP
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError(""); // Resetta l'errore

        try {
            const response = await fetch("http://localhost:8080/auth/send-phone-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ number: emailOrPhone }),
                credentials: "include",  // Assicura che il cookie sia incluso automaticamente
            });

            if (response.ok) {
                setOtpSent(true); // Indica che l'OTP è stato inviato
                alert("OTP inviato al numero di telefono.");
            } else {
                const errorData = await response.json();
                setError(`Errore: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Errore di connessione:", error);
            setError("Errore di connessione al server.");
        }
    };

    // Verifica l'OTP e accede
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError(""); // Resetta l'errore

        try {
            const response = await fetch("http://localhost:8080/auth/verify-phone", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ number: emailOrPhone, otp }),
                credentials: "include", // Per includere il cookie di sessione automaticamente
            });

            if (response.ok) {
                alert("Numero verificato con successo!");

                // Dopo aver verificato il numero, prova a creare una sessione
                // Questo può essere fatto in modo simile al login via email
                const sessionCookie = document.cookie.split("; ").find(cookie => cookie.startsWith("SESSION_ID="));
                if (sessionCookie) {
                    const sessionIdValue = sessionCookie.split("=")[1];
                    setSessionId(sessionIdValue); // Imposta il sessionId
                    console.log("Sessione attiva:", sessionIdValue);
                } else {
                    console.log("Cookie di sessione non accessibile o non impostato.");
                }
            } else {
                const errorData = await response.json();
                setError(`Errore: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Errore di connessione:", error);
            setError("Errore di connessione al server.");
        }
    };

    // Funzione per il login tramite email e password
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError(""); // Resetta l'errore

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: emailOrPhone, password }),
                credentials: "include",  // Assicura che il cookie sia incluso automaticamente
            });

            if (response.ok) {
                alert("Login eseguito con successo!");
                const allCookies = document.cookie.split("; ");
                const sessionCookie = allCookies.find(cookie => cookie.startsWith("SESSION_ID="));

                if (sessionCookie) {
                    const sessionIdValue = sessionCookie.split("=")[1];
                    setSessionId(sessionIdValue); // Memorizza il valore del cookie nel componente
                    console.log("Sessione attiva:", sessionIdValue);
                } else {
                    console.log("Cookie di sessione non accessibile o non impostato.");
                }
            } else {
                setError("Username o password errati.");
            }
        } catch (error) {
            console.error("Errore di rete:", error);
            setError("Errore di connessione al server.");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Resetta l'errore prima di ogni tentativo di login

        if (isPhoneLogin && otpSent) {
            // Verifica OTP
            handleVerifyOtp(e);
        } else if (isPhoneLogin) {
            // Invio OTP se il login è tramite telefono
            handleSendOtp(e);
        } else {
            // Login con email e password
            handleEmailLogin(e);
        }
    };

    return (
        <div className={classes.container}>
            <ImmaginePrincipale />
            <div className={classes.text}>
                <h2>La nostra pasticceria artigianale ti aspetta!</h2>
                <p>C'est la Vie è una pasticceria in stile francese con una boutique in via Carlo Croce, 4 a Varese. La nostra pasticceria artigianale offre una vasta gamma di prodotti dolciari, tra cui: macarons, torte tradizionali e moderne, biscotti artigianali, pasticceria mignon, confetture e marmellate. Inoltre, su prenotazione, realizziamo torte personalizzabili per eventi e wedding cake. È possibile recarsi nel laboratorio di Via Garibaldi, 5 sia per gli ordini che per i ritiri. Il laboratorio è aperto dal martedì al sabato dalle 7.30 alle 13.00 e dalle 14.30 alle 17.00 e la domenica dalle 8.00 alle 12.30.

                    Per effettuare un ordine o richiedere informazioni, è possibile compilare il modulo di contatto presente in questa pagina.</p>
                <ContactButton />
            </div>

            <div className={classes.formContainer}>
                <img src="boutique.jpg" alt="immagine1" className={classes.imgBoutique} />

                <div className={classes.form}>
                    <h2>Accedi</h2>
                    {error && <p className={classes.error}>{error}</p>}
                    {sessionId && <p className={classes.success}>Sessione attiva con ID: {sessionId}</p>}
                    <form onSubmit={handleLogin}>
                        <label>
                            <input
                                type="radio"
                                checked={!isPhoneLogin}
                                onChange={() => setIsPhoneLogin(false)} // Login via Email
                            /> Accedi con Email
                        </label>
                        <label>
                            <input
                                type="radio"
                                checked={isPhoneLogin}
                                onChange={() => setIsPhoneLogin(true)} // Login via Phone
                            /> Accedi con Numero di Telefono
                        </label>

                        {isPhoneLogin ? (
                            <>
                                <label htmlFor="phone">Numero di Telefono</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    className={classes.inputField}
                                    value={emailOrPhone}
                                    onChange={(e) => setEmailOrPhone(e.target.value)}
                                    required
                                />
                                {otpSent && (
                                    <>
                                        <label htmlFor="otp">Inserisci OTP</label>
                                        <input
                                            type="text"
                                            id="otp"
                                            name="otp"
                                            className={classes.inputField}
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                        />
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={classes.inputField}
                                    value={emailOrPhone}
                                    onChange={(e) => setEmailOrPhone(e.target.value)}
                                    required
                                />
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={classes.inputField}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </>
                        )}
                        <button type="submit" className={classes.submitButton}>
                            {isPhoneLogin && !otpSent ? "Invia OTP" : "Login"}
                        </button>
                        <p>Non hai un account? <a href="/registrati">Registrati</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
}
