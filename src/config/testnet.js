const testnetProd = [
  {
    name: 'Beta Network',
    color: '#7265e6',
    value: 'testnet2',
  },
  {
    name: 'Alpha Network',
    color: '#f56a00',
    value: 'testnet1',
  },
  {
    name: 'Dev Network',
    color: '#dc3545',
    value: 'testnet3',
  },
]

const testnetClientProd = [
  process.env.REACT_APP_GRAPHQL_ENDPOINT || 'https://beta.zoobc.net/zoobc/api/v1/graphql',
  'https://alpha.zoobc.net/zoobc/api/v1/graphql',
  'https://demo.zoobc.net/zoobc/api/v1/graphql',
]

export const testnetClient = testnetClientProd

export default testnetProd
