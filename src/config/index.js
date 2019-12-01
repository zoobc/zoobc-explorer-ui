import store from '../utils/store'

const config = {
  endpoint: {
    api:
      process.env.REACT_APP_API === 'localhost'
        ? 'http://localhost:6969/zoobc/api/v1'
        : 'https://alpha.zoobc.net/zoobc/api/v1',
    graphql:
      process.env.REACT_APP_API === 'localhost'
        ? 'http://localhost:6969/zoobc/api/v1/graphql'
        : 'https://alpha.zoobc.net/zoobc/api/v1/graphql',
  },
  app: {
    defaultLang: store.use('language', 'en'),
  },
  doolbell: {
    api_key: process.env.REACT_APP_DOORBELL_KEY,
  },
}

export default config
