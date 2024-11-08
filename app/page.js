'use client';

import React, { useState, useEffect, useRef } from 'react';
import classes from './page.module.css';
import Image from 'next/image';

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

export default function Home() {

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
        <Image className={classes.logo} src="/Giacomo-1920w.jpg" alt="Immagine Giacomo" width={551} height={588} />
      </div>

      <div className={classes.info}>

        <div>
          <h2>Orari di apertura</h2>
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
          <div className={classes.imgOrario}>
            <Image src="/barattoli.webp" alt="Immagine Barattoli" width={407} height={379} />
          </div>
        </div>

        <div className={classes.infoC}>
          <Image className={classes.infoCImm} src="/macaron.webp" alt="Immagine Macaron" width={507} height={603} />
        </div>

        <div className={classes.sedi}>
          <div className={classes.imgSedi}>
            <Image src="/formaggio.webp" alt="Immagine Formaggio" width={340} height={309} />
          </div>
          <h2>Le nostre sedi</h2>
          <p>Laboratorio: Via Garibaldi, 5 - Varese</p>
          <p>Boutique: Via Carlo Croce, 4 - Varese</p>
          <ContactButton />
        </div>
      </div>

      {/* Sezione macaron  */}
      <div className={classes.macaronD}>
        <div className={classes.imageWrapper}>
          <Image src="/diagonaleU.png" alt="Immagine Diagonale Superiore" width={1520} height={100} className={classes.diagonalImageTop} />
          <Image src="/macaronD.jpg" alt="Immagine Macaron Animazione" width={671} height={751} className={classes.macaronImage} /> 
          <Image src="/diagonaleD.png" alt="Immagine Diagonale Inferiore" width={1520} height={100} className={classes.diagonalImageBottom} />
        </div>
      </div>

      <div className={classes.prodotti}>

        <div className={classes.macarons}>
          <h2>Macarons</h2>
          <p>Macarons = un’esplosione di sapore racchiusa tra due gusci morbidi e un cremoso ripieno. Dolcetti piccoli, rotondi e coloratissimi. Semplicemente deliziosi! Impossibile non innamorarsi a prima vista di questi dolci unici nel loro genere che ti travolgeranno con il loro sapore. Da C’est la Vie abbiamo sempre disponibili una grande varietà di gusti differenti tra cui scegliere. Sono inoltre l’ideale per un regalo elegante e raffinato.</p>
        </div>

        <div className={classes.confrontoBiscottiConfetture}>
          <div className={classes.biscotti}>
            <h2>Biscotti</h2>
            <p>La pasticceria C’est la Vie propone deliziosi biscotti artigianali. I nostri biscotti non sono ovviamente semplici biscotti ma piccoli capolavori di pasticceria pensati per accompagnare con gusto ogni momento della giornata: dalla colazione al tè del pomeriggio, dalla pausa mattutina alla coccola della sera.

              Con gli Incontri potrete assaporare deliziose combinazioni: nocciola e caramello salato, lampone e cioccolato, cioccolato e caffè, pistacchio e limone, cocco e rhum e cocco e frutti esotici.

              Da provare anche i nostri baci di dama, specialità dolciaria della cucina piemontese: due rotonde metà di frolla unite da un velo di cioccolato! E ancora le nostre varianti dei brutti ma buoni.

              Vieni a trovarci per scoprire tutte le nostre proposte!</p>
            <div className={classes.imgBiscotti}>
              <Image src="/biscotti.jpg" alt="Immagine Biscotti" width={671} height={751} />
            </div>
          </div>

          <div className={classes.confetture}>
            <div className={classes.imgConfetture}>
              <Image src="/Confetture.webp" alt="Immagine Confetture" width={671} height={751} />
            </div>
            <h2>Confetture e Marmellate</h2>
            <p>Nella nostra bellissima Boutique troverete ad aspettarvi anche le buonissime marmellate e confetture homemade.

              Dai gusti audaci, le nostre marmellate sono uniche e irresistibili, ma soprattutto buone!

              Prodotte esclusivamente in modo artigianale e con ingredienti di prima scelta sono ideali per una sana colazione o per una deliziosa merenda.

              Le trovate di vari gusti: arancia rossa e castagna, albicocca e camomilla, fragola e fava tonka, pesca e lavanda, pompelmo e pepe rosa e tanti altri! Le varianti sono molte e cambiano anche in base alla stagionalità!

              Queste deliziose confetture sono anche perfette come cadeau o come bomboniera per il vostro evento!</p>
          </div>
        </div>

        <div className={classes.confrontoBiscottiConfetture}>

          <div className={classes.biscotti}>
            <h2>Tavolette di cioccolato</h2>
            <p>Vieni a provare le nostre tavolette di cioccolato gourmet, un prodotto unico e creato con passione e amore. Le tavolette di Cioccolato Gourmet sono caratterizzate da contrasti di sapori innovativi e sorprendenti che seguono le evoluzioni del gusto. Un esempio? la nostra tavoletta gold: cioccolato fondente Chimelb con golosa farcitura alla nocciola pralinata, profumata con limone e zenzero.</p>
            <div className={classes.imgBiscotti}>
              <Image src="/Tavoletta2.webp" alt="Immagine Tavoletta" width={671} height={751} />
            </div>
          </div>

          <div className={classes.confetture}>
            <div className={classes.imgConfetture}>
              <Image src="/Cerimonie.webp" alt="Immagine Cerimonie" width={671} height={751} />
            </div>
            <h2>Torte per eventi</h2>
            <p>Le nozze sono uno dei giorni più importanti della vita e le torte nuziali rappresentano un vero e proprio simbolo di questo evento. Potrete scegliere la nostra pasticceria per la realizzazione della vostra torta, un pasticciere vi seguirà dal momento degli assaggi fino al grande giorno.

              Le nostre torte nuziali sono completamente personalizzabili ed è possibile scegliere tra la torta a piani o più torte singole. Entrambe di grande effetto. Collaboriamo con le realtà di catering più rinomate della zona, così da ricreare la decorazione perfetta per il vostro grande giorno.</p>
          </div>

        </div>

      </div>

      <div>


        <div className={classes.barattoliFondo}>
          <div className={classes.background2}>
            <Image src="/Barattoli-fondo.webp" alt="Immagine Barattoli Fondo" width={1519} height={501} />
          </div>
          <div className={classes.barattoli}>
            <div className={classes.textBarattoli}>
              <h2>Cerchi una pasticceria artigianale a Varese?</h2>
              <p>Contattaci per prenotare uno dei nostri deliziosi prodotti o per avere maggiori informazioni!</p>
              <ContactButton />
            </div>
          </div>
        </div>
      </div>

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
