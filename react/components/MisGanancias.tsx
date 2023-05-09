import React, { useEffect, useState } from "react";
import { useRenderSession } from "vtex.session-client";
import Niveles from "./Niveles";
import Nolinker from "./Nolinker";
import Summary from "./Summary";
import Ordenes from "./Ordenes";
import Spinner from '@vtex/styleguide/lib/Spinner'
import { useVerifyUserId } from "../hooks/validate.service";
import styles from "./niveles.css"


const MisGanancias = () => {
	//Datos de Session
  const { session } = useRenderSession(); // sesion me trae los datos del id que necesito para verificar
  const userId = session?.namespaces.authentication.storeUserId.value;
  const linkerId = session?.namespaces.profile.document.value;
console.log('linkerid', linkerId)

  //Estados//
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [documentValue, setDocumentValue] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(true);

  //este me trae el response data
  const useverify = useVerifyUserId(userId);
  const { status } = useverify;
 

  //useEffect para renderizar el componente cuando se monte y cuando cambie el estado
  useEffect(() => {
    setIsMounted(true); // esto es  para cuando el componente se monte, se verifica que esta montado es para verificar que no se va a actualizar el estado antes de que sea montado el componente
    setDocumentValue(status);

    return () => {
      setIsMounted(false);
    };
  }, [userId, status]);

  /*
  if (isLoading) {
    return <div className={styles.spinner__container}>
    <p className={styles.spinner__container__text}> Estamos cargando tu información... </p>
      <span className="dib c-muted-1">
        <Spinner color="#ff7e7c" size={100} />
      </span>
    </div>; // Si isLoading es true, se muestra un componente de loading
  }
*/

  //Espacio para mostrar el schema que viene del backend 

  if (!isMounted || documentValue === false || status === undefined) {
    return <div style={{width:'100%', height:'100%'}}>
          <Nolinker image={{
              url: "https://s3-alpha-sig.figma.com/img/999a/b23d/9313e594b49f88db3c52c55cfae9b94b?Expires=1684713600&Signature=frls6H0ojbTI25yD5R1hgbbvWorIhCyqHrMwLYcYbpCD8CpgdXJEvK-5fYZoqxiBYvhOWbiMfbJemhti4hzSoX2a4JPn~t7qbQimeTN4a4C6aVIKWmW6Rr2Lq67QuKzVZptrKPjcJzSiVLHIJk5WnQch5aeECp5m9LfzNcrm~otzIz0EcM65nmiONa1Znk8Q25Rl5ZioF9RxpuG9C8Q0W--IfwZnNAff8A442AiM4-GOAecGkqyBPpjIcVjHLOFAQcHM5o8MpG0RBMWTcFdCFWxbgqu7HfPGX9op25755kqnvvDZcpOHt2rr18zBucVeZ5iZRF2pd7zXnhSghwOXNA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
              alt: "Conviertete En Linker ",
              title: "Imagen Linker",
              srcset:"https://s3-alpha-sig.figma.com/img/6e41/f521/663e5434ed11e18a328688c12b85b81c?Expires=1684713600&Signature=eYUaiX~g3nLym~S9C3AsvfBRHtglZUbFpfp-tW2yovg0CZWn2dTKvRgvTXDsM4iSHwQaaQgigA2fUISeMV8gk1gd7-ukiPkc4elE9JRCdK9EJRvYxi8v1Tvwu47L5RYGiodNGwrKLGIybCwELVfR7QMIsANyZ8gq9~iZMogYD1hx5~cRFSOa0VH~qQbgZQJpmgaquoO6SEXgUzGi3u8dMc9K15EfYedNhbeGnez-Ill4nKtzZ~PV~ItKvx4I-uzbiDBfTBOZ1Ef2DX933e~1UXRGE7wXSc6pVDpDAf6iVHHldnPlZitDoMXLYPv0GU92CS4~5wteRH7rlpNYKu7CJA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4 768w, https://s3-alpha-sig.figma.com/img/999a/b23d/9313e594b49f88db3c52c55cfae9b94b?Expires=1684713600&Signature=frls6H0ojbTI25yD5R1hgbbvWorIhCyqHrMwLYcYbpCD8CpgdXJEvK-5fYZoqxiBYvhOWbiMfbJemhti4hzSoX2a4JPn~t7qbQimeTN4a4C6aVIKWmW6Rr2Lq67QuKzVZptrKPjcJzSiVLHIJk5WnQch5aeECp5m9LfzNcrm~otzIz0EcM65nmiONa1Znk8Q25Rl5ZioF9RxpuG9C8Q0W--IfwZnNAff8A442AiM4-GOAecGkqyBPpjIcVjHLOFAQcHM5o8MpG0RBMWTcFdCFWxbgqu7HfPGX9op25755kqnvvDZcpOHt2rr18zBucVeZ5iZRF2pd7zXnhSghwOXNA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4 1200w"
            }} />
    </div>}

  return (
    <>
    <div className={styles.misganancias} >
      <Niveles userId={userId} />
    </div>
    <div className={styles.ordenes__summary}>
      <Ordenes idLinker={linkerId} />
      <Summary  userId={userId} />
    </div>
    </>
  );
};

export default MisGanancias;
