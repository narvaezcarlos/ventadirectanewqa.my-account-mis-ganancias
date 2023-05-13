import React, { useState, useEffect } from "react";
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

  const getData = React.useCallback(async () => {
    const data = await fetch(
      "https://websvrx.hermeco.com/offcorsspersonalization/public/api/linkapp/getNiveles"
    );
    const response = await data.json();
    setNiveles(response);
  }, []);

  const getUserLevel = React.useCallback(async () => {
    if (userId) {
      const response = await fetch(
				`https://websvrx.hermeco.com/offcorsspersonalization/public/api/linkapp/getUserByUserId/${userId}`
			);
      const userData = await response.json();
      const userLevel = userData.nivel;
      setUserLevel(userLevel);
    }
  }, [userId]);

  useEffect(() => {
    getData();
    getUserLevel();
  }, [userId, getData, getUserLevel]);

  return (
    <>
  <div className={styles.niveles__niveles}>
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
    </div>
    </>
    );
};

export default Niveles;
