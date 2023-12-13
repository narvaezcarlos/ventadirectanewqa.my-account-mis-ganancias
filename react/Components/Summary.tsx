import React from 'react'
import { useGlobalContext } from '../context/GlobalContext';
import styles from '../styles/summary.module.css';
import { formatDate, getMonths } from '../utils/formatDate';
import QRCode from "react-qr-code";


const Summary = () => {
  const { summary } = useGlobalContext()

  const earnings = summary?.ganancia ? summary.ganancia : 0;
  const contable = earnings.toLocaleString("es-ES", { useGrouping: true });

  return (
    <div className={styles.summary__container}>
      <h2 className={styles.summary__title}>Resumen de ganancias</h2>

      <div className={styles.summary__container__text}>
        <span className={styles.summary__span}
          style={{ width: '20%' }}
        >Mi link:</span>
        <p className={styles.summary__paragraph}
          style={{ width: '80%', fontSize: '14px' }}
        >
          https://www.linkapp.com.co/tienda?id={summary?.linkerId}
        </p>
      </div>

      {summary?.linkQR &&
        <div className={styles.summary__container__text}
          style={{
            justifyContent: 'center',
            flexDirection: 'column'
          }}>
          <p className={styles.summary__paragraph}
            style={{ width: '100%', textAlign: 'center' }}
          >
            Escanea o toma una foto al código QR y compártelo!
          </p>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "40%", width: "40%" }}
            value={`https://www.linkapp.com.co/tienda?id=${summary?.linkerId}%26src=${summary.linkerType}`}
            viewBox={`0 0 256 256`}
          />

          {summary.phone &&
            <div className={styles.btn_share}>
              <a 
                className={styles.link_btn_share} 
                href={`https://api.whatsapp.com/send?phone=${summary.phone}&text=Hola, Este es mi código de compra!`}
                target='__blank'>
                Compartir QR

              </a>
           </div>
          }
        </div>
      }

      <div className={styles.summary__container__text}      >
        <p className={styles.summary__paragraph}
          style={{ width: '100%', textAlign: 'center' }}
        >
          Aquí te mostramos un resumen de como has crecido desde que estas con
          nosotros
        </p>
      </div>

      <div className={styles.summary__container__text}>
        <span className={styles.summary__span}>Fecha de ingreso:</span>
        <p className={styles.summary__paragraph}>
          {summary?.createdIn && formatDate(summary?.createdIn)}
        </p>
      </div>

      <div className={styles.summary__container__text}>
        <span className={styles.summary__span}>Fecha de hoy:</span>
        <p className={styles.summary__paragraph}>
          {formatDate(new Date().toDateString())}
        </p>
      </div>

      <div className={styles.summary__container__text}>
        <span className={styles.summary__span}>Fecha actualización:</span>
        <p className={styles.summary__paragraph}>
          {summary?.updatedIn && formatDate(summary?.updatedIn)}
        </p>
      </div>

      <div className={styles.summary__container__text}>
        <span className={styles.summary__span}>Meses como linker:</span>
        <p className={styles.summary__paragraph}>
          {summary?.createdIn && getMonths(summary?.createdIn)}
          {summary?.createdIn && getMonths(summary?.createdIn) > 1 ? " mes" : " meses"}
        </p>
      </div>

      <div className={styles.summary__container__text}>
        <p className={styles.summary__paragraph}
          style={{ width: '100%', textAlign: 'center' }}
        >
          En  {summary?.createdIn && getMonths(summary?.createdIn)}
          {summary?.createdIn && getMonths(summary?.createdIn) > 1 ? " mes" : " meses"} mes has registrado el siguiente total de ganancias como Linker:
        </p>
      </div>

      <div className={styles.summary__earnings}>
        <p className={styles.summary__contable}>{`$${contable}`}</p>
      </div>

    </div>
  );
};


export default Summary