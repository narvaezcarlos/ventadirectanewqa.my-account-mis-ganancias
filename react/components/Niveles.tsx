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
  const [loading, setLoading] = useState<boolean>(false);

  const [isTendero, setIsTendero] = useState<boolean>(false)
  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userlevel');

    if (!storedUserData) {
      (
        async function () {
          setLoading(true)
          const dataUsersById = await fetch(
            `https://carlosgiovanny--ventadirectanewqa.myvtex.com/usersById/${userId}`
          );
          const userData = await dataUsersById.json();
          const userLevel = userData.nivel;
          if (userData.linkerType === "Tendero") {
            setIsTendero(true)
          }
          setUserLevel(userLevel);
          sessionStorage.setItem('userlevel', JSON.stringify(userData));

          const dataLevels = await fetch(
            'https://carlosgiovanny--ventadirectanewqa.myvtex.com/levelsLinker'
          );
          const responseLevel = await dataLevels.json();
          setNiveles(responseLevel);
          sessionStorage.setItem('nivelesData', JSON.stringify(responseLevel));
          setLoading(false)
        }
      )()
    }

    if (storedUserData) {
      setLoading(true)
      const userData = JSON.parse(storedUserData);

      if (userData.linkerType === "Tendero") {
        setIsTendero(true)
      }
      const userLevel = userData.nivel;
      setUserLevel(userLevel);

      const storedData = sessionStorage.getItem('nivelesData');
      if (storedData) {
        setNiveles(JSON.parse(storedData));
      }
      setLoading(false)
    }
  }, [])

  return (
    <>
    {
      loading ? null :
    !isTendero ? (<div className={styles.niveles__niveles}>
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
