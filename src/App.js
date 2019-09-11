import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
// import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import client from './utils/client'
import store from './store'
import i18n from './i18n'

import Home from './pages/Home'
import Accounts from './pages/Accounts'
import Footer from './components/Footer'

import BlockLatest from './pages/Blocks/BlockLatest'
import BlockSummary from './pages/Blocks/BlockSummary'
import TransactionLatest from './pages/Transactions/TransactionLatest'
import TransactionSummary from './pages/Transactions/TransactionSummary'
import AccountLatest from './pages/Accounts/AccountLatest'
import Peers from './pages/Peers'
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

import {
  MapPeer,
  TransactionAmountStats,
  TransactionTypeStats,
  BlockTransactionPeriodStats,
} from './containers'
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
              <Route exact path="/" render={props => <Home {...props} />} />
              <Route exact path="/blocks" render={props => <BlockLatest {...props} />} />
              <Route exact path="/blocks/:id" render={props => <BlockSummary {...props} />} />
              <Route
                exact
                path="/transactions"
                render={props => <TransactionLatest {...props} />}
              />
              <Route
                exact
                path="/transactions/:id"
                render={props => <TransactionSummary {...props} />}
              />
              <Route exact path="/accounts" render={props => <AccountLatest {...props} />} />
              <Route exact path="/accounts/detail" render={props => <Accounts {...props} />} />
              <Route exact path="/monitor/map-peers" render={props => <MapPeer {...props} />} />
              <Route exact path="/peers" render={props => <Peers {...props} />} />
              <Route
                exact
                path="/monitor/transaction-amount-stats"
                render={props => <TransactionAmountStats {...props} />}
              />
              <Route
                exact
                path="/monitor/transaction-type-stats"
                render={props => <TransactionTypeStats {...props} />}
              />
              <Route
                exact
                path="/monitor/block-transaction-period-stats"
                render={props => <BlockTransactionPeriodStats {...props} />}
              />
              <Route exact path="/v1" render={props => <HomeV1 {...props} />} />
              <Route exact path="/v1/blocks" render={props => <BlocksV1 {...props} />} />
              <Route exact path="/v1/blocks/:id" render={props => <BlockV1 {...props} />} />
              <Route
                exact
                path="/v1/transactions"
                render={props => <TransactionsV1 {...props} />}
              />
              <Route
                exact
                path="/v1/transactions/:id"
                render={props => <TransactionV1 {...props} />}
              />
              <Route exact path="/v1/accounts" render={props => <AccountsV1 {...props} />} />
              <Route exact path="/v1/accounts/:id" render={props => <AccountV1 {...props} />} />
              <Route exact path="/v1/nodes" render={props => <NodesV1 {...props} />} />
              <Route exact path="/v1/nodes/:id" render={props => <NodeV1 {...props} />} />
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
