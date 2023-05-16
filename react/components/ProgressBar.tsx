import React, { useState, useEffect } from "react";
import styles from "./progressBar.css";

interface ProgressBarProps {
  userId: string;
}

interface User {
  ganancia: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);

  const getUser = React.useCallback(async () => {
    if (userId) {
<<<<<<< HEAD
      const response = await fetch(
				`https://websvrx.hermeco.com/offcorsspersonalization/public/api/linkapp/getUserByUserId/${userId}`
			);
      const userData = await response.json()
      setUser(userData);
=======
      const cachedData = localStorage.getItem(`user_${userId}`);
      if (cachedData) {
        const userData = JSON.parse(cachedData);
        setUser(userData);
      } else {
        const response = await fetch(
          `https://websvrx.hermeco.com/offcorsspersonalization/public/api/Ventadirectanew/getUserByUserId/${userId}`
        );
        const userData = await response.json();
        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
        setUser(userData);
      }
>>>>>>> dev
    }
  }, [userId]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  function getActiveCircle(index: number) {
    if (!user) {
      return false;
    }

    const ganancia = user.ganancia;
    switch (index) {
      case 0:
        return ganancia > 250000 && ganancia <= 500000;
      case 1:
        return ganancia >= 500001 && ganancia <= 999999;
      case 2:
        return ganancia >= 1000000;
      default:
        return false;
    }
  }

  return (
    <div className={styles.progress__bar}>
      <div className={styles.progress__bar__step}>
        <div className={`${styles.progress__bar__step__circle} ${getActiveCircle(0) ? styles.active : ''}`}></div>
      </div>
      <div className={styles.progress__bar__step}>
        <div className={`${styles.progress__bar__step__circle} ${getActiveCircle(1) ? styles.active : ''}`}></div>
      </div>
      <div className={styles.progress__bar__step}>
        <div className={`${styles.progress__bar__step__circle} ${getActiveCircle(2) ? styles.active : ''}`}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
