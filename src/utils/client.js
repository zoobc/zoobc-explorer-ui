import { WebSocketLink } from '@apollo/client/link/ws'
import { onError } from '@apollo/client/link/error'
import { getMainDefinition } from '@apollo/client/utilities'
import { ApolloClient, ApolloLink, split, HttpLink, InMemoryCache } from '@apollo/client'

import { testnetClient } from '../config/testnet'

const createLink = uri => {
  const httpLink = new HttpLink({ uri })

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
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const setupApolloCLient = uri => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([onErrorHandler, createLink(uri)]),
  })
}

const clients = testnetClient.reduce((current, value, index) => {
  current[`testnet${index + 1}`] = setupApolloCLient(value)
  return current
}, {})

export const defaultClient = setupApolloCLient(testnetClient[0])
export default clients
