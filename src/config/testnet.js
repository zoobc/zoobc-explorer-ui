const testnetLocal = [
  {
    name: 'Local Testnet',
    color: '#f56a00',
    value: 'testnet1',
  },
  // {
  //   name: 'Testnet 2',
  //   color: '#7265e6',
  //   value: 'testnet2',
  // },
  // {
  //   name: 'Testnet 3',
  //   color: '#ffbf00',
  //   value: 'testnet3',
  // },
  // {
  //   name: 'Testnet 4',
  //   color: '#00a2ae',
  //   value: 'testnet4',
  // },
  // {
  //   name: 'Testnet 5',
  //   color: '#dc3545',
  //   value: 'testnet5',
  // },
  // {
  //   name: 'Testnet 6',
  //   color: '#096dd9',
  //   value: 'testnet6',
  // },
  // {
  //   name: 'Testnet 7',
  //   color: '#7265e6',
  //   value: 'testnet7',
  // },
  // {
  //   name: 'Testnet 8',
  //   color: '#ffbf00',
  //   value: 'testnet8',
  // },
  // {
  //   name: 'Testnet 9',
  //   color: '#00a2ae',
  //   value: 'testnet9',
  // },
  // {
  //   name: 'Testnet 10',
  //   color: '#dc3545',
  //   value: 'testnet10',
  // },
  // {
  //   name: 'Testnet 11',
  //   color: '#096dd9',
  //   value: 'testnet11',
  // },
]

const testnetProd = [
  {
    name: 'Alpha Network',
    color: '#f56a00',
    value: 'testnet1',
  },
  {
    name: 'Beta Network',
    color: '#7265e6',
    value: 'testnet2',
  },
  // {
  //   name: 'Testnet 1010',
  //   color: '#ffbf00',
  //   value: 'testnet3',
  // },
  // {
  //   name: 'Testnet 5858',
  //   color: '#00a2ae',
  //   value: 'testnet4',
  // },
  {
    name: 'Dev Network',
    color: '#dc3545',
    value: 'testnet3',
  },
  // {
  //   name: 'Demo 9168',
  //   color: '#ffbf00',
  //   value: 'testnet3',
  // },
  // {
  //   name: 'Experimental 9181',
  //   color: '#00a2ae',
  //   value: 'testnet4',
  // },
]

const testnetClientProd = [
  // process.env.REACT_APP_GRAPHQL_ENDPOINT || 'https://alpha.zoobc.net/zoobc/api/v1/graphql',
  process.env.REACT_APP_GRAPHQL_ENDPOINT || 'https://alpha.zoobc.net/zoobc/api/v1/graphql',
  'https://beta.zoobc.net/zoobc/api/v1/graphql',
  // 'https://test1010.zoobc.net/zoobc/api/v1/graphql',
  // 'https://test5858.zoobc.net/zoobc/api/v1/graphql',
  'https://demo.zoobc.net/zoobc/api/v1/graphql',
  // 'https://demo9168.zoobc.net/zoobc/api/v1/graphql',
  // 'https://exp9181.zoobc.net/zoobc/api/v1/graphql',
]

const testnetClientLocal = [
  'http://localhost:6969/zoobc/api/v1/graphql',
  // 'http://localhost:2480/zoobc/api/v1/graphql',
  // 'http://localhost:2420/zoobc/api/v1/graphql',
  // 'http://localhost:2481/zoobc/api/v1/graphql',
  // 'http://localhost:2510/zoobc/api/v1/graphql',
  // 'http://localhost:2540/zoobc/api/v1/graphql',
  // 'http://localhost:2420/zoobc/api/v1/graphql',
  // 'http://localhost:2500/zoobc/api/v1/graphql',
  // 'http://localhost:2520/zoobc/api/v1/graphql',
  // 'http://localhost:2490/zoobc/api/v1/graphql',
  // 'http://localhost:2460/zoobc/api/v1/graphql',
  // 'http://localhost:2470/zoobc/api/v1/graphql',
]

export const testnetClient =
  process.env.REACT_APP_API === 'localhost' ? testnetClientLocal : testnetClientProd

export default process.env.REACT_APP_API === 'localhost' ? testnetLocal : testnetProd
