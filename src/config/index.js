const config = {
  endpoint: {
    api:
      process.env.REACT_APP_API === 'localhost'
        ? 'http://localhost:6969/zoobc/api/v1'
        : 'http://139.162.15.80:6969/zoobc/api/v1',
    graphql:
      process.env.REACT_APP_API === 'localhost'
        ? 'http://localhost:6969/zoobc/api/v1/graphql'
        : 'http://139.162.15.80:6969/zoobc/api/v1/graphql',
  },
  app: {
    defaultLang: 'en',
  },
  doolbell: {
    api_key: process.env.REACT_APP_DOORBELL_KEY,
  },
}

export default config
