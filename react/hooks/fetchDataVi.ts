import { useState } from 'react';

export const useVerifyUserId = () => {
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const baseURL = 'https://websvrx.hermeco.com/offcorsspersonalization/public/';

  const fetchData = (userId:string) => {
    setLoading(true);
    fetch(`${baseURL}api/linkapp/getUserByUserId/${userId}`, {
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
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
  };

  return { status, error, loading, fetchData };
 
};
