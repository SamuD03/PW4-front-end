import styles from './domande.module.css';

export default function DomandeGenerali() {
    return (
        <>
            <div className={styles.domande}>
                <h2>Domande generali</h2>

                {domande.map((domanda, index) => (
                    <div key={index} className={styles.questionContainer}>
                        <input type="checkbox" id={`toggle-${index}`} className={styles.toggleInput} />
                        <label htmlFor={`toggle-${index}`} className={styles.questionHeader}>
                            <h3>{domanda.titolo}</h3>
                            <span className={styles.toggleButton}></span>
                        </label>
                        <p className={styles.answer}>{domanda.risposta}</p>
                    </div>
                ))}
            </div>

        </>
    );
}

const domande = [
    {
        titolo: 'Dove si trova Pasticceria C\'Est La Vie?',
        risposta: 'Pasticceria C\'Est La Vie si trova a Varese (VA) - Via Carlo Croce 4',
    },
    {
        titolo: 'Quali sono gli orari di apertura di Pasticceria C\'Est La Vie?',
        risposta: 'L\'orario di apertura di Pasticceria C\'Est La Vie è: da Martedì a Domenica: 09:00 - 13:00, da Martedì a Domenica: 14:00 - 19:30',
    },
    {
        titolo: 'Quali sono i servizi che offre Pasticceria C\'Est La Vie?',
        risposta: 'Pasticceria C\'Est La Vie offre i seguenti servizi: Torte Personalizzate, Cake Design',
    },
    {
        titolo: 'Quali sono le opinioni degli utenti di Pasticceria C\'Est La Vie?',
        risposta: 'Leggi le recensioni di Pasticceria C\'Est La Vie oppure lascia la tua opinione su Paginegialle.it',
    },
    {
        titolo: 'Quali sono le specialità di Pasticceria C\'Est La Vie?',
        risposta: 'Pasticceria C\'Est La Vie propone le seguenti specialità: Macarons, Cookies',
    },
    {
        titolo: 'Come posso contattare Pasticceria C\'Est La Vie?',
        risposta: 'Puoi contattare Pasticceria C\'Est La Vie tramite email: info@pasticceriacestlavie.it, telefono: 327 7380932, WhatsApp: 327 7380932',
    },
];

