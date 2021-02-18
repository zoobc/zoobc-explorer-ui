/**
 * ZooBC Copyright (C) 2020 Quasisoft Limited - Hong Kong
 * This file is part of ZooBC <https://github.com/zoobc/zoobc-explorer-ui>

 * ZooBC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * ZooBC is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with ZooBC.  If not, see <http://www.gnu.org/licenses/>.

 * Additional Permission Under GNU GPL Version 3 section 7.
 * As the special exception permitted under Section 7b, c and e,
 * in respect with the Author’s copyright, please refer to this section:

 * 1. You are free to convey this Program according to GNU GPL Version 3,
 *     as long as you respect and comply with the Author’s copyright by
 *     showing in its user interface an Appropriate Notice that the derivate
 *     program and its source code are “powered by ZooBC”.
 *     This is an acknowledgement for the copyright holder, ZooBC,
 *     as the implementation of appreciation of the exclusive right of the
 *     creator and to avoid any circumvention on the rights under trademark
 *     law for use of some trade names, trademarks, or service marks.

 * 2. Complying to the GNU GPL Version 3, you may distribute
 *     the program without any permission from the Author.
 *     However a prior notification to the authors will be appreciated.

 * ZooBC is architected by Roberto Capodieci & Barton Johnston
 * contact us at roberto.capodieci[at]blockchainzoo.com
 * and barton.johnston[at]blockchainzoo.com

 * IMPORTANT: The above copyright notice and this permission notice
 * shall be included in all copies or substantial portions of the Software.
**/

import React, { Suspense, useContext } from 'react'
import { ApolloProvider } from '@apollo/client'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import i18n from './i18n'
import clients from './utils/client'
import Fallback from './components/Fallback'
import NotFound from './pages/Errors/NotFound'
import DefaultLayout from './components/DefaultLayout'
import PrivateLayout from './components/PrivateLayout'
import ErrorBoundary from './components/ErrorBoundary'
import NotFoundComp from './components/Errors/NotFound'
import { store } from './utils'
import { ThemeState } from './context/ThemeContext'
import { AnimationState } from './context/AnimationContext'
import TestnetContext, { TestnetState } from './context/TestnetContext'

const Home = React.lazy(() => import('./pages/Home'))
const Blocks = React.lazy(() => import('./pages/Blocks'))
const Block = React.lazy(() => import('./pages//Block'))
const Transactions = React.lazy(() => import('./pages/Transactions'))
const Transaction = React.lazy(() => import('./pages/Transaction'))
const Accounts = React.lazy(() => import('./pages/Accounts'))
const Account = React.lazy(() => import('./pages/Account'))
const Nodes = React.lazy(() => import('./pages/Nodes'))
const Node = React.lazy(() => import('./pages/Node'))
const AdminKeywords = React.lazy(() => import('./pages/Admin/Keywords'))
const AdminKeywordsFormNew = React.lazy(() => import('./pages/Admin/Keywords/formNew'))
const AdminKeywordsFormEdit = React.lazy(() => import('./pages/Admin/Keywords/formEdit'))
const AdminChangePassword = React.lazy(() => import('./pages/Admin/ChangePassword'))

function ApolloMultiProvider({ children }) {
  const { selectedTestnet } = useContext(TestnetContext)
  return <ApolloProvider client={clients[selectedTestnet.value]}>{children}</ApolloProvider>
}

function App() {
  const hasLogin = store.get('usrtoken') !== null && store.get('usraccess') !== null

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
                        <Route exact path="/panel" render={props => <PrivateLayout {...props} />} />

                        {hasLogin && (
                          <Route
                            exact
                            path="/panel/keywords"
                            render={props => <AdminKeywords {...props} />}
                          />
                        )}
                        {hasLogin && (
                          <Route
                            exact
                            path="/panel/keywords/new"
                            render={props => <AdminKeywordsFormNew {...props} />}
                          />
                        )}
                        {hasLogin && (
                          <Route
                            exact
                            path="/panel/keywords/:key"
                            render={props => <AdminKeywordsFormEdit {...props} />}
                          />
                        )}
                        {hasLogin && (
                          <Route
                            exact
                            path="/panel/change-password"
                            render={props => <AdminChangePassword {...props} />}
                          />
                        )}

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
