import { useState, useEffect } from 'react';

export const useVerifyUserId = (userId: string) => {

 const baseURL = 'https://websvrx.hermeco.com/offcorsspersonalization/public/'
 
  useEffect(() => {
      fetch(`${baseURL}api/linkapp/getNiveles`)
				.then((response) => {
				})
				.catch((err) => {});
  }, []);
};
