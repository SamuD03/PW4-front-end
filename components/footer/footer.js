import React from 'react';
import classes from './footer.module.css';

export default function Footer() {
    return (
        <>
        <div className={classes.footer}>
            <div className={classes.footerContent}>
                <div className={classes.footerSection}>
                    <h2>Sede e contatti</h2>
                    <p>
                        Via Carlo Croce, 4 - 21100 Varese (VA) <br/>
                        Via Giuseppe Garibaldi, 5 - 21100 Varese (VA) <br/>
                        +39 327 7380932 <br/>
                        pasticceriacestlavie@gmail.com <br/>
                    </p>
                </div>
                <div className={classes.footerSection}>
                    <h2>Orari Boutique</h2>
                    <div className={classes.schedule}>
                        <div className={classes.scheduleColumn}>
                            <p>Lunedì</p>
                            <p>Mar - Ven</p>
                            <p>Sabato</p>
                            <p>Domenica</p>
                        </div>
                        <div className={classes.scheduleColumn}>
                            <p>Chiuso</p>
                            <p>8:30 - 19:00</p>
                            <p>9:00 - 19:00</p>
                            <p>9:00 - 13:00</p>
                            <p>15:00 - 19:00</p>
                        </div>
            </div>
        </div>
        <div className={classes.footerSection}>
            <h2>Orari Laboratorio</h2>
            <div className={classes.schedule}>
                <div className={classes.scheduleColumn}>
                    <p>Lunedì</p>
                    <p>Mar - Sab</p>
                    <p style={{visibility: 'hidden'}}>Placeholder</p> {/* Spacer */}
                    <p>Domenica</p>
                </div>
                <div className={classes.scheduleColumn}>
                    <p>Chiuso</p>
                    <p>07:30 - 13:00</p>
                    <p>14:30 - 16:00</p>
                    <p>08:00 - 12:30</p>
                </div>
            </div>

        </div>
        </div>
</div>
    <div className={classes.footerBottom}>
        <p>P.I. 03468950120</p>
    </div>
</>
)
    ;
}
