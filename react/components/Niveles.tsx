import React, { useState, useEffect, useMemo } from "react";
import styles from './niveles.css'
import ProgressBar from "./ProgressBar";

interface Nivel {
  nivel: number;
  nivelDesc: string;
}

interface NivelesProps {
  userId: string;
}

const Niveles: React.FC<NivelesProps> = ({ userId }) => {
  const [niveles, setNiveles] = useState<Nivel[]>([]);
  const [userLevel, setUserLevel] = useState<number | null>(null);
  const [linkerType, setLinkerType] = useState<string | null>(null);
  const [isTendero, setIsTendero] = useState<boolean>(false)

useEffect(() => {
  const storedUserData = sessionStorage.getItem('userlevel');
  if (!storedUserData) {
    ( async function(){
      const storedData = sessionStorage.getItem('nivelesData');
      if (storedData) {
        setNiveles(JSON.parse(storedData));
      } else {
        const data = await fetch(
          'https://websvrx.hermeco.com/offcorsspersonalization/public/api/ventadirectanew/getNiveles'
        );
        const response = await data.json();
        setNiveles(response);
        sessionStorage.setItem('nivelesData', JSON.stringify(response));
      }
    }
    )()
  }
  //console.log(storedUserData, '38')
}, [])


/*
  const getData = React.useCallback(async () => {
    const storedData = sessionStorage.getItem('nivelesData');
    if (storedData) {
      setNiveles(JSON.parse(storedData));
    } else {
      const data = await fetch(
				'https://websvrx.hermeco.com/offcorsspersonalization/public/api/ventadirectanew/getNiveles'
			);
      const response = await data.json();
      setNiveles(response);
      sessionStorage.setItem('nivelesData', JSON.stringify(response));
    }
  }, []);
  */
useEffect(() => {
(
  async function() {
    const storedUserData = sessionStorage.getItem('userlevel');
   // console.log(storedUserData, '60')
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setLinkerType(userData.linkerType);
      if (userData.linkerType === "Tendero") {
       // console.log('65')
        setIsTendero (true)
        
      }
      //console.log(userData, 'userdata')
      const userLevel = userData.nivel;
      setUserLevel(userLevel);
    } else {
      const response = await fetch(
        `https://websvrx.hermeco.com/offcorsspersonalization/public/api/ventadirectanew/getUserByUserId/${userId}`
      );
      const userData = await response.json();
      const userLevel = userData.nivel;
      setLinkerType(userData.linkerType);
      if (userData.linkerType === "Tendero" || null) {
       // console.log('78')
        setIsTendero (true)
      }
      setUserLevel(userLevel);
      sessionStorage.setItem('userlevel', JSON.stringify(userData));
    }
  }
)()
}, [])

/*
  const getUserLevel = React.useCallback(async () => {
    if (userId) {
      const storedUserData = sessionStorage.getItem('userlevel');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        console.log(userData, 'userdata')
        const userLevel = userData.nivel;
        setUserLevel(userLevel);
      } else {
        const response = await fetch(
					`https://websvrx.hermeco.com/offcorsspersonalization/public/api/ventadirectanew/getUserByUserId/${userId}`
				);
        const userData = await response.json();
        const userLevel = userData.nivel;
        setLinkerType(userData.linkerType);
        setUserLevel(userLevel);
        sessionStorage.setItem('userlevel', JSON.stringify(userData));
      }
    }
  }, [userId]);

  useEffect(() => {
    getUserLevel();
  }, [userId, getUserLevel]);

  const isTendero = useMemo(() => {
    return linkerType === "Tendero" ? true : false
  }, [linkerType])
*/
  console.log(isTendero, ' istendero')
  console.log(linkerType, 'linkerType')
  return (
    <>
    {!isTendero ? (<div className={styles.niveles__niveles}>
        <h2 className={styles.niveles__title}>
          Mi nivel
        </h2>
        <div className={styles.niveles__progress__bar}>
        <ProgressBar userId={userId} />
            <div className={styles.niveles}>
          {niveles.map((nivel) => (
            <div className={styles.niveles__container} key={nivel.nivel}>
                    <div className={styles.niveles__title__container}>
                        <h3
                        className={styles.niveles__level__title}
                        style={{
                            color: userLevel === nivel.nivel ? "#E048B8" : "#404040",
                            opacity: userLevel ===nivel.nivel ? "" : "0.4" }}>
                        {nivel.nivel}{" "}
                        </h3>
                        <div
                            className={styles.niveles__container__description}
                            style={{
                                backgroundColor:
                                userLevel === nivel.nivel ? "#170341" : "#ECECEC"}}>
                                <h4
                                    className={styles.niveles__description}
                                    style={{
                                        color: userLevel === nivel.nivel ? "#FFFFFF" : "#404040",
                                        opacity: userLevel ===nivel.nivel ? "" : "0.4"}}>
                                        {nivel.nivelDesc}{" "}
                                </h4>
                        </div>
                    </div>
            </div>
            ))}
        </div>
        </div>
    </div>) : null }
    </>
    );
};

export default Niveles;
