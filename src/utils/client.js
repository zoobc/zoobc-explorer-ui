import ApolloClient from 'apollo-boost'

import config from '../config'

const client = new ApolloClient({
  uri: config.endpoint.graphql,
  //uri: 'http://localhost:6969/zoobc/api/v1/graphql',
})

export default client
