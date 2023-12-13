import React from 'react'
import { useGlobalContext } from '../context/GlobalContext';
import styles from '../styles/summary.module.css';
import { formatDate, getMonths } from '../utils/formatDate';



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
          style={{ width: '80%', fontSize: '13px' }}
        >
          https://www.linkapp.com.co/tienda?id={summary?.linkerId}
        </p>
      </div>

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
          {summary?.createdIn && getMonths(summary?.createdIn) === 1 ? " mes" : " meses"}
        </p>
      </div>

      <div className={styles.summary__container__text}>
        <p className={styles.summary__paragraph}
          style={{ width: '100%', textAlign: 'center' }}
        >
          En 1 mes has registrado el siguiente total de ganancias como Linker:
        </p>
      </div>

      <div className={styles.summary__earnings}>
        <p className={styles.summary__contable}>{`$${contable}`}</p>
      </div>

    </div>
  );
};


export default Summary