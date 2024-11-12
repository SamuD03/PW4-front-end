'use client';

import { useState } from "react";
import classes from './page.module.css';

export default function Registrati() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email && !number) {
            setError("Devi inserire almeno l'email o il numero di telefono.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, surname, email, password, number }),
            });

            if (response.ok) {
                setSuccess("Registrazione completata con successo!");
                window.location.href = "/login";  // Redirige alla pagina di login
            } else if (response.status === 400) {
                const data = await response.json();
                setError(data.message || "Utente già presente.");
            } else {
                setError("Errore durante la registrazione.");
            }
        } catch (error) {
            console.error("Errore di rete:", error);
            setError("Errore di connessione al server.");
        }
    };

    return (
        <div className={classes.container}>

            <div className={classes.formContainer}>

                <div className={classes.form}>
                    <h2>Registrati</h2>

                    {error && <p className={classes.error}>{error}</p>}
                    {success && <p className={classes.success}>{success}</p>}
                    <form onSubmit={handleRegister}>

                        <label htmlFor="name">Nome</label>
                        <input type="text" id="name" name="name" className={classes.inputField} value={name} onChange={(e) => setName(e.target.value)} required />

                        <label htmlFor="surname">Cognome</label>
                        <input type="text" id="surname" name="surname" className={classes.inputField} value={surname} onChange={(e) => setSurname(e.target.value)} required />

                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" className={classes.inputField} value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" className={classes.inputField} value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <label htmlFor="number">Numero di telefono</label>
                        <input type="tel" id="number" name="number" className={classes.inputField} value={number} onChange={(e) => setNumber(e.target.value)} />

                        <button type="submit" className={classes.submitButton}>Registrati</button>

                    </form>

                </div>

            </div>

        </div>
    );
}