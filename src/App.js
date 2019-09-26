import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import client from './utils/client'
import store from './store'
import i18n from './i18n'

import Footer from './components/Footer'
import NotFound from './pages/Errors/NotFound'

// version 1 components
import HomeV1 from './pages/v1/Home'
import BlocksV1 from './pages/v1/Blocks'
import BlockV1 from './pages/v1/Block'
import TransactionsV1 from './pages/v1/Transactions'
import TransactionV1 from './pages/v1/Transaction'
import AccountsV1 from './pages/v1/Accounts'
import AccountV1 from './pages/v1/Account'
import NodesV1 from './pages/v1/Nodes'
import NodeV1 from './pages/v1/Node'
import Header from './components/Header'

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <Header />
            {/* <div className="min-height-body"> */}
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
            {/* </div> */}
            <Footer />
          </BrowserRouter>
        </I18nextProvider>
      </ApolloProvider>
    </Provider>
  )
}

export default App
