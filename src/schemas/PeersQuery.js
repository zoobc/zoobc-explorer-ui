import gql from 'graphql-tag'

const PeersQuery = gql`
  {
    peers {
      Address
      AnnouncedAddress
      Port
      State
      Version
    }
  }
`

export default PeersQuery
