import { Suspense, useRef, useEffect } from "react";
import { useVerifyUserId } from "../hooks/fetchDataVi";
import { useRenderSession } from "vtex.session-client";
import { Spinner } from "vtex.styleguide";
import Niveles from "./Niveles";
import Ordenes from "./Ordenes";
import Summary from "./Summary";
import styles from "./niveles.css";

interface Props {
  userId: string;
}

const MisGanancias = (props: Props) => {
  //Datos de Session
  const { session } = useRenderSession(); // sesion me trae los datos del id que necesito para verificar
  const userId = session?.namespaces?.authentication?.storeUserId?.value;
  const linkerId = session?.namespaces?.profile?.document?.value;

  const prevUserIdRef = useRef(userId);
  const {
    status,
    error: errorFromHook,
    loading,
    fetchData,
  } = useVerifyUserId();

  const error = errorFromHook as unknown as Error | string | undefined;

  const setStatus = (status: boolean) => {
    sessionStorage.setItem(userId, JSON.stringify({ status })); // Aqui Guardamos los datos en localStorage
  };
  if (userId && prevUserIdRef.current !== userId) {
    const storedData = sessionStorage.getItem(userId); // Aqui obtenemos los datos de localStorage para el usuario actual
    if (!storedData) {
      // Se ejecuta cuando no hay datos guardados para llamar a la api
      fetchData(userId);
      prevUserIdRef.current = userId;
    } else {
      // Si hay datos guardados, usarlos en vez de llamar a la API
      const parsedData = JSON.parse(storedData);
      setStatus(parsedData.status);
    }
  }

  const handleReturn = () => {
    window.location.assign("/account");
  };

  if (loading) {
    return (
      <div className={styles.spinner__container}>
        <Spinner color={"#f71963"} />
      </div>
    );
  }

  return (
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
        <>
          {error && (
            <p>
              Error:{" "}
              {error instanceof Error
                ? error.message
                : typeof error === "string"
                ? error
                : "Error desconocido"}
            </p>
          )}
          {!loading && !error && (
            <div>
              <div className={styles.misganancias}>
                <Niveles userId={userId} />
              </div>
              <div className={styles.ordenes__summary}>
                <Ordenes idLinker={linkerId} />
                <Summary userId={userId} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MisGanancias;
