'use client';

import React, { useState, useEffect, useRef } from 'react';
import classes from './page.module.css';
import Image from 'next/image';

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

export default function Home() {
  const [offsetY, setOffsetY] = useState(0);
  const descRef = useRef(null); // Riferimento al componente `desc`

  const handleScroll = () => {
    if (descRef.current) {
      const descTop = descRef.current.getBoundingClientRect().top;
      if (descTop > 0) {
        setOffsetY(window.scrollY * 0.5); // Effetto parallax
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={classes.overlay}>
        <Image className={classes.background} src="/background.png" alt="Immagine bg" fill style={{ objectFit: 'cover', transform: `translateY(${offsetY}px)` }} />
        <Image className={classes.logo} src="/LOGO-366w.webp" alt="Immagine Logo" width={300} height={100} />
      </div>

      <div className={classes.desc} ref={descRef}>
        <div className={classes.text}>
          <h2>Pasticceria C'est la Vie a Varese</h2>
          <p>Mi chiamo Giacomo Aceti e sono il titolare di C’est la Vie. La mia pasticceria nasce nel 2015 come laboratorio artigianale in via Garibaldi, 5 a Varese e nel 2020 apro un punto vendita espositivo per la vendita diretta in Via Carlo Croce, 4.<br />
            Nel laboratorio produciamo tutti i prodotti messi a disposizione del pubblico nella boutique, con una continua ricerca di materie prime di alta qualità e una lavorazione che unisce tradizione e innovazione.<br />
            Il mio è un giovanissimo team che guido con entusiasmo e passione. Una passione che porto avanti da 16 anni, iniziata con un percorso nella scuola alberghiera di Stresa e concluso con il corso superiore di pasticceria di Alma.<br />
            Accanto a me, uno staff giovane e preparato. Formo personalmente il mio team trasmettendo valori per me fondamentali in questo lavoro: <strong className={classes.bold}> Divertimento, Passione, Ricercatezza, Innovazione e Attenzione al dettaglio. </strong><br />
            C’est la Vie è un luogo capace di sorprendere per l’amore trasmesso attraverso l’arte della pasticceria, ma anche per l’accoglienza informale: “Ci piace coinvolgere il cliente e trasmettere la nostra passione”. A fare la differenza è anche la location di Via Carlo Croce. Già dall’esterno è possibile ammirare una grande vetrata da cui poter apprezzare i nostri deliziosi prodotti. Una location elegante e raffinata. Una volta entrati vi perderete in meravigliosi profumi e colori capaci di sorprendere ed incuriosire.</p>
          <div>
            <ContactButton />
          </div>
        </div>
        <Image className={classes.logo} src="/Giacomo-1920w.jpg" alt="Giacomo" width={551} height={588} />
      </div>
    </>
  );
}
