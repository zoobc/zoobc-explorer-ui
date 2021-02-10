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

import moment from 'moment'
import encryption from './encryption'
import { message } from 'antd'
import { store } from '../utils'
import { WebSocketLink } from '@apollo/client/link/ws'
import { onError } from '@apollo/client/link/error'
import { getMainDefinition } from '@apollo/client/utilities'
import { ApolloClient, ApolloLink, split, HttpLink, InMemoryCache } from '@apollo/client'

import { testnetClient } from '../config/testnet'

const lastRefreshField = () => ({
  fields: {
    LastRefresh: {
      read() {
        return new Date()
      },
    },
  },
})

const createLink = uri => {
  /** adding security header */
  const timestamp = moment.utc().unix() - moment.utc('1970-01-01 00:00:00').unix()
  const consumerId = process.env.REACT_APP_GRAPHQL_CLIENT_ID || '1234567890'
  const consumerSecret = process.env.REACT_APP_GRAPHQL_CLIENT_SECRET || 'client-secret-key'
  const signature = encryption.hmacEncrypt(`${consumerId}&${timestamp}`, consumerSecret)
  const headers = {
    'x-timestamp': timestamp,
    'x-cons-id': consumerId,
    'x-signature': signature,
  }

  const token = store.get('usrtoken')
  if (token) headers.Authorization = `Bearer ${token}`

  const httpLink = new HttpLink({ uri, headers })

  const wsLink = new WebSocketLink({
    uri: uri
      .replace('http', 'ws')
      .replace('https', 'wss')
      .replace('graphql', 'subscriptions'),
    options: { reconnect: true, lazy: true, timeout: 20000 },
  })

  return split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
  )
}

const onErrorHandler = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
  if (networkError) {
    console.log(`[Network error]: ${JSON.stringify(networkError)}`)

    const unAuth =
      networkError.result &&
      networkError.result.errors &&
      networkError.result.errors[0].extensions &&
      networkError.result.errors[0].extensions.code === 'UNAUTHENTICATED'

    if (unAuth) {
      store.remove('usrtoken')
      store.remove('usraccess')
      message.error(networkError.result.errors[0].message, 10)

      setTimeout(() => {
        window.location.href = '/panel'
      }, 1000)
    }
  }
})

const setupApolloCLient = uri => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Accounts: lastRefreshField(),
        Blocks: lastRefreshField(),
        Transactions: lastRefreshField(),
        Nodes: lastRefreshField(),
      },
    }),
    link: ApolloLink.from([onErrorHandler, createLink(uri)]),
  })
}

const clients = testnetClient.reduce((current, value, index) => {
  current[`testnet${index + 1}`] = setupApolloCLient(value)
  return current
}, {})

export const defaultClient = setupApolloCLient(testnetClient[0])
export default clients
