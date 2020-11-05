import React, { Suspense, useContext } from 'react'
import { ApolloProvider } from '@apollo/client'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import i18n from './i18n'
import clients from './utils/client'
import NotFound from './pages/Errors/NotFound'
import NotFoundComp from './components/Errors/NotFound'
import Fallback from './components/Fallback'
import DefaultLayout from './components/DefaultLayout'
import ErrorBoundary from './components/ErrorBoundary'
import { AnimationState } from './context/AnimationContext'
import TestnetContext, { TestnetState } from './context/TestnetContext'
import { ThemeState } from './context/ThemeContext'

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
  return <ApolloProvider client={clients[selectedTestnet.value]}>{children}</ApolloProvider>
}

function App() {
  return (
    <ThemeState>
      <TestnetState>
        <ApolloMultiProvider>
          <I18nextProvider i18n={i18n}>
            <BrowserRouter>
              <AnimationState>
                <DefaultLayout>
                  <ErrorBoundary>
                    <Suspense fallback={<Fallback />}>
                      <Switch>
                        <Route exact path="/" render={props => <Home {...props} />} />
                        <Route exact path="/blocks" render={props => <Blocks {...props} />} />
                        <Route exact path="/blocks/:id" render={props => <Block {...props} />} />
                        <Route
                          exact
                          path="/transactions"
                          render={props => <Transactions {...props} />}
                        />
                        <Route
                          exact
                          path="/transactions/:id+"
                          render={props => <Transaction {...props} />}
                        />
                        <Route exact path="/accounts" render={props => <Accounts {...props} />} />
                        <Route
                          exact
                          path="/accounts/:id"
                          render={props => <Account {...props} />}
                        />
                        <Route exact path="/nodes" render={props => <Nodes {...props} />} />
                        <Route exact path="/nodes/:id+" render={props => <Node {...props} />} />
                        <Route exact path="/search" render={props => <NotFound {...props} />} />
                        <Route exact path="*" render={props => <NotFoundComp {...props} />} />
                      </Switch>
                    </Suspense>
                  </ErrorBoundary>
                </DefaultLayout>
              </AnimationState>
            </BrowserRouter>
          </I18nextProvider>
        </ApolloMultiProvider>
      </TestnetState>
    </ThemeState>
  )
}

export default App
