import ApolloClient from 'apollo-boost'

import { testnetClient } from '../config/testnet'

const setupApolloCLient = uri => {
  return new ApolloClient({
    uri,
  })
}
const clients = testnetClient.reduce((current, value, index) => {
  current[`testnet${index + 1}`] = setupApolloCLient(value)
  return current
}, {})

export const defaultClient = setupApolloCLient(testnetClient[0])

export default clients
