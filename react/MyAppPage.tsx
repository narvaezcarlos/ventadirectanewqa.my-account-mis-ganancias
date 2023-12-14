import React, { Fragment } from 'react'
import { Route } from 'vtex.my-account-commons/Router'
import { GlobalProvider } from './context/GlobalContext';
import MyEarnings from './Components/MyEarnings';



const MyAppPageContext = () => {

  return (
    <GlobalProvider>
      <MyEarnings />
    </GlobalProvider>
  )

}


const MyAppPage = () => (
  <Fragment>
    <Route
      exact
      path="/mis-ganancias"
      component={MyAppPageContext} />
  </Fragment>
);

export default MyAppPage
