'use client';

import React, { useState, useEffect, useRef } from 'react';
import classes from './immagine-principale.module.css';
import Image from 'next/image';

export default function ImmaginePrincipale() {

    //immagine principale
    const [offsetY, setOffsetY] = useState(0);
    const descRef = useRef(null); // Riferimento al componente `desc`

    const handleScroll = () => {
        setOffsetY(window.scrollY * 0.5); // Effetto parallax solo per l'immagine specifica
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className={classes.overlay}>
                <Image className={classes.background} src="/background.png" alt="Immagine Bg" fill style={{ objectFit: 'cover', transform: `translateY(${offsetY}px)` }} />
                <Image className={classes.logo} src="/LOGO-366w.webp" alt="Immagine Logo" width={300} height={100} />
            </div>
        </>

    );
}