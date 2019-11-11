const testnetLocal = [
  {
    name: 'Testnet 1',
    color: '#f56a00',
    value: 'testnet1',
  },
  {
    name: 'Testnet 2',
    color: '#7265e6',
    value: 'testnet2',
  },
  {
    name: 'Testnet 3',
    color: '#ffbf00',
    value: 'testnet3',
  },
  {
    name: 'Testnet 4',
    color: '#00a2ae',
    value: 'testnet4',
  },
  {
    name: 'Testnet 5',
    color: '#dc3545',
    value: 'testnet5',
  },
  {
    name: 'Testnet 6',
    color: '#096dd9',
    value: 'testnet6',
  },
  {
    name: 'Testnet 7',
    color: '#7265e6',
    value: 'testnet7',
  },
  {
    name: 'Testnet 8',
    color: '#ffbf00',
    value: 'testnet8',
  },
  {
    name: 'Testnet 9',
    color: '#00a2ae',
    value: 'testnet9',
  },
  {
    name: 'Testnet 10',
    color: '#dc3545',
    value: 'testnet10',
  },
  {
    name: 'Testnet 11',
    color: '#096dd9',
    value: 'testnet11',
  },
]

const testnetProd = [
  {
    name: 'Testnet 1',
    color: '#f56a00',
    value: 'testnet1',
  },
  {
    name: 'Testnet 2',
    color: '#7265e6',
    value: 'testnet2',
  },
]

const testnetClientProd = [
  'http://139.162.15.80:6969/zoobc/api/v1/graphql',
  'http://139.162.15.80:9696/zoobc/api/v1/graphql',
]

const testnetClientLocal = [
  'http://192.168.20.248:7000/zoobc/api/v1/graphql',
  'http://192.168.20.242:7000/zoobc/api/v1/graphql',
  'http://192.168.21.248:7000/zoobc/api/v1/graphql',
  'http://192.168.20.251:7000/zoobc/api/v1/graphql',
  'http://192.168.20.254:7000/zoobc/api/v1/graphql',
  'http://192.168.20.242:7000/zoobc/api/v1/graphql',
  'http://192.168.20.250:7000/zoobc/api/v1/graphql',
  'http://192.168.20.252:7000/zoobc/api/v1/graphql',
  'http://192.168.20.249:7000/zoobc/api/v1/graphql',
  'http://192.168.20.246:7000/zoobc/api/v1/graphql',
  'http://192.168.20.247:7000/zoobc/api/v1/graphql',
]

export const testnetClient =
  process.env.REACT_APP_API === 'localhost' ? testnetClientLocal : testnetClientProd

export default process.env.REACT_APP_API === 'localhost' ? testnetLocal : testnetProd
