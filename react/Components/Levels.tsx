import React, { Fragment } from 'react'
import styles from '../styles/niveles.module.css'
import { useGlobalContext } from '../context/GlobalContext';
import ProgressBar from './ProgressBar';


const Levels = () => {
  const { isShopkeeper, levels, userLevel } = useGlobalContext()

  return (
    <Fragment>
      {!isShopkeeper ?
        <div className={styles.niveles__niveles}>

          <h2 className={styles.niveles__title}>
            Mi nivel
          </h2>

          <div className={styles.niveles__progress__bar}>
            <ProgressBar />

            <div className={styles.niveles}>
              {levels.sort((a, b) => a.id.localeCompare(b.id)).map(level => (
                <div
                  key={level.id}
                  className={styles.niveles__container}
                >

                  <div className={styles.niveles__title__container}>
                    <h3
                      className={styles.niveles__level__title}
                      style={{
                        color: level.nivel.includes(userLevel.toString()) ? "#E048B8" : "",
                        opacity: level.nivel.includes(userLevel.toString()) ? "" : "0.4"
                      }}
                    >
                      {level.nivel}{" "}
                    </h3>
                  </div>

                  <div
                    className={styles.niveles__container__description}
                    style={{
                      backgroundColor:
                        level.nivel.includes(userLevel.toString()) ? "#170341" : ""
                    }}
                  >
                    <h4
                      className={styles.niveles__description}
                      style={{
                        color: level.nivel.includes(userLevel.toString()) ? "#FFFFFF" : "",
                        opacity: level.nivel.includes(userLevel.toString()) ? "" : "0.4"
                      }}>
                      {level.nivelDesc}{" "}
                    </h4>
                  </div>
                </div>
              ))
              }
            </div>

          </div>

        </div> :
        null

      }
    </Fragment>
  );
};


export default Levels
