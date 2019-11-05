import ApolloClient from 'apollo-boost'

import { tesnetClient } from '../config/tesnet'

const setupApolloCLient = uri => {
  return new ApolloClient({
    uri
  })
}
const clients = tesnetClient.reduce((current, value, index) => {
  current[`testnet${index + 1}`] = setupApolloCLient(value)
  return current
}, {});

export const defaultClient = setupApolloCLient(tesnetClient[0])

export default clients
