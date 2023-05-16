import { Suspense, useRef } from "react";
import { useVerifyUserId } from "../hooks/fetchDataVi";
import { useRenderSession } from "vtex.session-client";
import { Spinner } from 'vtex.styleguide'
import Niveles from "./Niveles";
import Ordenes from "./Ordenes";
import Summary from "./Summary";
import styles from "./niveles.css"

interface Props {
  userId:string
}

const MisGanancias = (props: Props) => {

//Datos de Session
const { session } = useRenderSession(); // sesion me trae los datos del id que necesito para verificar
const userId = session?.namespaces?.authentication?.storeUserId?.value;
const linkerId = session?.namespaces?.profile?.document?.value;
console.log('linkerid', linkerId)

const prevUserIdRef = useRef(userId);
const { status, error: errorFromHook, loading, fetchData } = useVerifyUserId()
console.log('status', status)

const error = errorFromHook as unknown as Error | string | undefined;

const setStatus = (status: boolean) => {
  localStorage.setItem(userId, JSON.stringify({ status })); // Aqui Guardamos los datos en localStorage
}
if (userId && prevUserIdRef.current !== userId) {
  const storedData = localStorage.getItem(userId); // Aqui obtenemos los datos de localStorage para el usuario actual
  if (!storedData) { // Se ejecuta cuando no hay datos guardados para llamar a la api
    console.log('datos guardados en localstorage',storedData)
    fetchData(userId);
    prevUserIdRef.current = userId;
  } else { // Si hay datos guardados, usarlos en vez de llamar a la API
    const parsedData = JSON.parse(storedData);
    setStatus(parsedData.status);
    console.log('estoy guardado' )
  }
}

console.log('me redericé')

return (
  <div>
       <Suspense fallback={<h4>Loading....</h4>}>
    {status && (
      <>
        {status && loading && <p>Cargando...</p>}
        {error && (
          <p>Error: {error instanceof Error ? error.message : (typeof error === "string" ? error : "Error desconocido")}</p>
        )}
        {!loading && !error && (
          <div>
            <div className={styles.misganancias} >
              <Niveles userId={userId} />
            </div>
            <div className={styles.ordenes__summary}>
              <Ordenes idLinker={linkerId} />
              <Summary  userId={userId} />
              </div>
          </div>
        )}
      </>
    )}
     </Suspense>
  </div>
);

}

export default MisGanancias
