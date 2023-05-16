import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from '@vtex/styleguide/lib/Spinner'
import style from "./summary.css"

interface SummaryData {
  createdIn: string;
  ganancia: number;
  linkerId: string;
  //  otros campos que se reciban de la API
}

interface SummaryProps {
  userId: string;
}

const Summary: React.FC<SummaryProps> = ({ userId }) => {
  const [summary, setSummary] = useState<SummaryData | null>(null);

  const saveDataToLocalStorageSummary = (data: SummaryData, key: string) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const getDataFromLocalStorageSummary = (key: string): SummaryData | null => {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  };

  useEffect(() => {
<<<<<<< HEAD
    const fetchData = async () => {
      const result = await axios.get<SummaryData>(
				`https://websvrx.hermeco.com/offcorsspersonalization/public/api/linkapp/getUserByUserId/${userId}`
			);
      setSummary(result.data);
    };
=======
    const key = "summaryData";
    const storedSummaryData = getDataFromLocalStorageSummary(key);

    if (storedSummaryData) {
      setSummary(storedSummaryData);
    } else {
      const fetchData = async () => {
        const result = await axios.get<SummaryData>(
          `https://websvrx.hermeco.com/offcorsspersonalization/public/api/Ventadirectanew/getUserByUserId/${userId}`
        );
        setSummary(result.data);
        saveDataToLocalStorageSummary(result.data, key);
      };
>>>>>>> dev

      fetchData();
    }
  }, [userId]);

  if (!summary) {
    return <div className={style.spinner__container}>
    <p className={style.spinner__container__text}> Estamos cargando tu información... </p>
      <span className="dib c-muted-1">
        <Spinner color="#ff7e7c" size={30} />
      </span>
    </div>; // Si isLoading es true, se muestra un componente de loading
  }
const link = summary.linkerId

const today = new Date();
const createdDate = new Date(summary.createdIn);
const createdMonth = createdDate.getMonth()- 1;
const createdYear = createdDate.getFullYear();
const firstDayOfMonth = new Date(createdYear, createdMonth, 1);
const months = Math.round((today.getTime() - firstDayOfMonth.getTime()) / (30 * 24 * 60 * 60 * 1000));

const earnings = summary.ganancia ? summary.ganancia : 0;
const contable = earnings.toLocaleString("es-ES", {useGrouping: true});

  return (
    <div className={style.summary__container}>
      <h2 className={style.summary__title}>Resumen de ganancias</h2>
      <p className={style.summary__paragraph}> <span className={style.summary__span}>Mi link:</span> https://linkapp.com.co/tienda/?id={link}</p>
      <p className={style.summary__paragraph}>Aquí te mostramos un resumen de como has crecido desde que estas con nosotros</p>
      <p className={style.summary__paragraph1}><span className={style.summary__span}>Fecha de ingreso: </span>  {createdDate.toLocaleDateString()}</p>
      <p className={style.summary__paragraph1}><span className={style.summary__span}>Fecha de hoy: </span> {today.toLocaleDateString()}</p>
      <p className={style.summary__paragraph1}> <span className={style.summary__span}>Meses como linker: </span>{months}{months === 1 ? " mes" : " meses"}</p>
      <p className={style.summary__paragraph}>En 1 mes has registrado el siguiente total de ganancias como Linker:</p>
      <div className={style.summary__earnings}>
       <p className={style.summary__contable}>{`$${contable}`}</p> 
      </div>
    </div>
  );
};

export default Summary;
