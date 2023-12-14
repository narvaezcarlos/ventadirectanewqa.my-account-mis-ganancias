import React, {  Fragment } from 'react'
import { Spinner } from "vtex.styleguide";
import { useGlobalContext } from '../context/GlobalContext';
import styles from '../styles/niveles.module.css'
import Levels from './Levels';
import Orders from './Orders';
import Summary from './Summary';


const MyEarnings = () => {
  const { loading, status } = useGlobalContext()

  const handleReturn = () => {
    window.location.assign("/account");
  };

  return (
    <Fragment>
      {loading ?
        <div className={styles.spinner__container}>
          <Spinner color={"#f71963"} />
        </div>
        :
        <div className={styles.container__btn__return}>

          <button className={styles.btn__return} onClick={handleReturn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="vtex__icon-arrow-back"
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
            >
              <path
                d="M5.5 15.5002C5.75781 15.5002 5.92969 15.4169 6.10156 15.2502L11 10.5002L9.79687 9.33356L6.35938 12.6669L6.35938 0H4.64063L4.64062 12.6669L1.20312 9.33356L0 10.5002L4.89844 15.2502C5.07031 15.4169 5.24219 15.5002 5.5 15.5002Z"
                transform="translate(16.0002) rotate(90)"
                fill="currentColor"
              />
            </svg>{" "}
            Regreso{" "}
          </button>

          {status && (
            <div>
              <div className={styles.MyEarnings}>
                <Levels />
              </div>
              <div className={styles.ordenes__summary}>
                <Orders/>
                <Summary />
              </div>
            </div>
          )

          }
        </div>
      }
    </Fragment>

  );
};


export default MyEarnings