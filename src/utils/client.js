import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { ApolloClient, split, HttpLink, InMemoryCache } from '@apollo/client'

import { testnetClient } from '../config/testnet'

const setupApolloCLient = uri => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
      },
      new WebSocketLink({
        uri: uri.replace('http', 'ws').replace('https', 'wss'),
        options: { reconnect: true },
      }),
      new HttpLink({ uri })
    ),
  })
}

const clients = testnetClient.reduce((current, value, index) => {
  current[`testnet${index + 1}`] = setupApolloCLient(value)
  return current
}, {})

export const defaultClient = setupApolloCLient(testnetClient[0])
export default clients
