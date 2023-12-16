import React from 'react'
import styles from '../styles/progress_bar.module.css';
import { useGlobalContext } from '../context/GlobalContext';


const ProgressBar = () => {

  const { levels,
    user,
    minProfits,
    maxProfits, } = useGlobalContext()


  function getActiveCircle(index: number) {
    if (!user) {
      return false;
    }

    const ganancia = user.ganancia;

    switch (index) {
      case 0:
        return ganancia >= minProfits && ganancia <= (maxProfits / 2);
      case 1:
        return ganancia >= (maxProfits / 2 + 1) && ganancia < maxProfits
      case 2:
        return ganancia >= maxProfits;
      default:
        return false;
    }
  }


  const completed = user ? user?.ganancia / maxProfits *100 : 0

  return (
    <div className={styles.progress__bar}>
      {levels.length && levels.sort((a, b) => a.id.localeCompare(b.id)).map((_, index) => (
        <div key={index} className={styles.progress__bar__step}>
          <div className={`${styles.progress__bar__step__circle} ${getActiveCircle(index) ? styles.active : ''}`} />
        </div>
      ))

      }
      <div
      className={`${styles.progress__bar} ${ styles.active}`}
      style={{
        width:`${completed}%`
      }}
      />
    </div>
  );
};


export default ProgressBar
