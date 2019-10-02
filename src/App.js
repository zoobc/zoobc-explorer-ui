import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import client from './utils/client'
import store from './store'
import i18n from './i18n'

import Footer from './components/Footer'
import NotFound from './pages/Errors/NotFound'
import TopBarProgress from './components/TopbarProgress'

// version 1 components
const HomeV1 = React.lazy(() => import('./pages/v1/Home'))
const BlocksV1 = React.lazy(() => import('./pages/v1/Blocks'))
const BlockV1 = React.lazy(() => import('./pages/v1/Block'))
const TransactionsV1 = React.lazy(() => import('./pages/v1/Transactions'))
const TransactionV1 = React.lazy(() => import('./pages/v1/Transaction'))
const AccountsV1 = React.lazy(() => import('./pages/v1/Accounts'))
const AccountV1 = React.lazy(() => import('./pages/v1/Account'))
const NodesV1 = React.lazy(() => import('./pages/v1/Nodes'))
const NodeV1 = React.lazy(() => import('./pages/v1/Node'))
const Header = React.lazy(() => import('./components/Header'))

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <I18nextProvider i18n={i18n}>
          <Suspense fallback={<TopBarProgress />}>
            <BrowserRouter>
              <Header />
              <Switch>
                <Route exact path="/" render={props => <HomeV1 {...props} />} />
                <Route exact path="/blocks" render={props => <BlocksV1 {...props} />} />
                <Route exact path="/blocks/:id" render={props => <BlockV1 {...props} />} />
                <Route exact path="/transactions" render={props => <TransactionsV1 {...props} />} />
                <Route
                  exact
                  path="/transactions/:id"
                  render={props => <TransactionV1 {...props} />}
                />
                <Route exact path="/accounts" render={props => <AccountsV1 {...props} />} />
                <Route exact path="/accounts/:id" render={props => <AccountV1 {...props} />} />
                <Route exact path="/nodes" render={props => <NodesV1 {...props} />} />
                <Route exact path="/nodes/:id" render={props => <NodeV1 {...props} />} />
                <Route exact path="*" render={props => <NotFound {...props} />} />
              </Switch>
              <Footer />
            </BrowserRouter>
          </Suspense>
        </I18nextProvider>
      </ApolloProvider>
    </Provider>
  )
}

export default App
