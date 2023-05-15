import React, { Fragment } from 'react'
import { Route } from 'vtex.my-account-commons/Router'
import MisGanancias from './components/MisGananciasVi'



const MyAppPage = () => (
	<Fragment>
		<Route exact path="/mis-ganancias" component={MisGanancias} />
	</Fragment>
);

export default MyAppPage
