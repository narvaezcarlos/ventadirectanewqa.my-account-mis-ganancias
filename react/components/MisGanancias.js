import React, { useEffect } from 'react';
import { useRenderSession } from 'vtex.session-client';

const MisGanancias = () => {
	const { loading, session, error } = useRenderSession();

	useEffect(() => {
		console.log({ session });
		console.log(session?.namespaces.authentication.storeUserEmail.value);
		console.log(session?.namespaces.authentication.storeUserId.value);
	}, [session]);

	return (
		<div>
			<h1>Mis Ganancias</h1>
			<div>Mis Ganancias de este Mes</div>
		</div>
	);
};

export default MisGanancias;
