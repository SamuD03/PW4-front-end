
import React from 'react';
import classes from './footer.module.css';
import Image from 'next/image';


export default function Footer() {
    return (
        <>
            <div className={classes.footer}>

                <div className={classes.footerText}>

                    <Image src="/footer.png" alt="Immagine Footer" width={1519} height={290} />

                    <div className={classes.footerTextL}>
                        <h2>Sede e contatti</h2>
                        <p>
                            Via Carlo Croce, 4 - 21100 Varese (VA) <br />
                            Via Giuseppe Garibaldi, 5 - 21100 Varese (VA) <br />
                            +39 327 7380932 <br />
                            pasticceriacestlavie@gmail.com <br />
                        </p>
                    </div>

                    <div className={classes.footerTextC}>
                        <h2>Orari Boutique</h2>
                        <div className={classes.orario}>
                            <div className={classes.orarioL}>
                                <p>Lunedì <br />
                                    Mar - Ven <br />
                                    <br />
                                    Sab - Dom</p>
                            </div>
                            <div className={classes.orarioR}>
                                <p>Chiuso <br />
                                    08:00 - 13:00 <br /> 14:30 - 19:00 <br />
                                    14:30 - 19:00</p>
                            </div>
                        </div>
                    </div>

                    <div className={classes.footerTextR}>
                        <h2>Orari Laboratorio</h2>
                        <div className={classes.orario}>
                            <div className={classes.orarioL}>
                                <p>Lunedì <br />
                                    Mar - Sab <br />
                                    <br />
                                    Domenica</p>
                            </div>
                            <div className={classes.orarioR}>
                                <p>Chiuso <br />
                                    07:30 - 13:00 <br /> 14:30 - 16:00 <br />
                                    08:00 - 12:30</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes.footer2}>
                <p>P.I. 03468950120</p>
            </div>
        </>
    );
}