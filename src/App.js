import React, { Suspense, useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { I18nextProvider } from 'react-i18next'

import clients, { defaultClient } from './utils/client'
import i18n from './i18n'

import NotFound from './pages/Errors/NotFound'
import Fallback from './components/Fallback'
import TestnetContext, { TestnetState } from './context/TestnetContext'
import DefaultLayout from './components/DefaultLayout'
import ErrorBoundary from './components/ErrorBoundary'

const Home = React.lazy(() => import('./pages/Home'))
const Blocks = React.lazy(() => import('./pages/Blocks'))
const Block = React.lazy(() => import('./pages//Block'))
const Transactions = React.lazy(() => import('./pages/Transactions'))
const Transaction = React.lazy(() => import('./pages/Transaction'))
const Accounts = React.lazy(() => import('./pages/Accounts'))
const Account = React.lazy(() => import('./pages/Account'))
const Nodes = React.lazy(() => import('./pages/Nodes'))
const Node = React.lazy(() => import('./pages/Node'))

function ApolloMultiProvider({ children }) {
  const { selectedTestnet } = useContext(TestnetContext)
  return (
    <ApolloProvider client={clients[selectedTestnet.value] || defaultClient}>
      {children}
    </ApolloProvider>
  )
}

function App() {
  return (
    <TestnetState>
      <ApolloMultiProvider>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <DefaultLayout>
              <ErrorBoundary>
                <Suspense fallback={<Fallback />}>
                  <Switch>
                    <Route exact path="/" render={props => <Home {...props} />} />
                    <Route exact path="/blocks" render={props => <Blocks {...props} />} />
                    <Route exact path="/blocks/:id" render={props => <Block {...props} />} />
                    <Route exact path="/transactions" render={props => <Transactions {...props} />} />
                    <Route
                      exact
                      path="/transactions/:id"
                      render={props => <Transaction {...props} />}
                    />
                    <Route exact path="/accounts" render={props => <Accounts {...props} />} />
                    <Route exact path="/accounts/:id" render={props => <Account {...props} />} />
                    <Route exact path="/nodes" render={props => <Nodes {...props} />} />
                    <Route exact path="/nodes/:id+" render={props => <Node {...props} />} />
                    <Route exact path="/search" render={props => <NotFound {...props} />} />
                    <Route exact path="*" render={props => <NotFound {...props} />} />
                  </Switch>
                </Suspense>
              </ErrorBoundary>
            </DefaultLayout>
          </BrowserRouter>
        </I18nextProvider>
      </ApolloMultiProvider>
    </TestnetState>
  )
}

export default App
