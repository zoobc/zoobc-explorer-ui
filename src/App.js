import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { I18nextProvider } from 'react-i18next'

import client from './utils/client'
import i18n from './i18n'

import NotFound from './pages/Errors/NotFound'
import Fallback from './components/Fallback'

const Home = React.lazy(() => import('./pages/Home'))
const Blocks = React.lazy(() => import('./pages/Blocks'))
const Block = React.lazy(() => import('./pages//Block'))
const Transactions = React.lazy(() => import('./pages/Transactions'))
const Transaction = React.lazy(() => import('./pages/Transaction'))
const Accounts = React.lazy(() => import('./pages/Accounts'))
const Account = React.lazy(() => import('./pages/Account'))
const Nodes = React.lazy(() => import('./pages/Nodes'))
const Node = React.lazy(() => import('./pages/Node'))

function App() {
  return (
    <ApolloProvider client={client}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Suspense fallback={<Fallback />}>
            <Switch>
              <Route exact path="/" render={props => <Home {...props} />} />
              <Route exact path="/blocks" render={props => <Blocks {...props} />} />
              <Route exact path="/blocks/:id" render={props => <Block {...props} />} />
              <Route exact path="/transactions" render={props => <Transactions {...props} />} />
              <Route exact path="/transactions/:id" render={props => <Transaction {...props} />} />
              <Route exact path="/accounts" render={props => <Accounts {...props} />} />
              <Route exact path="/accounts/:id" render={props => <Account {...props} />} />
              <Route exact path="/nodes" render={props => <Nodes {...props} />} />
              <Route exact path="/nodes/:id" render={props => <Node {...props} />} />
              <Route exact path="*" render={props => <NotFound {...props} />} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </I18nextProvider>
    </ApolloProvider>
  )
}

export default App
