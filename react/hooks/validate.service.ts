import { useState, useEffect } from 'react';
import axios from 'axios';

export const useVerifyUserId = (userId: string) => {

  const [status, setStatus] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const baseURL = 'https://websvrx.hermeco.com/offcorsspersonalization/public/'


  useEffect(() => {
    setLoading(true);

      fetch(`${baseURL}api/Ventadirectanew/getUserByUserId/${userId}`, {
        method: 'GET',
        headers: {
        Accept: 'application/json',
      },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then((data) => {
        setStatus(Boolean(data?.isLinker));
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [userId]);
  return { status, error, loading };
};