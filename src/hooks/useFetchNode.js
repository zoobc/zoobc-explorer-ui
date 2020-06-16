import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'
import { getSortString } from '../utils'

const GET_NODES_DATA = gql`
  query getNodes($page: Int, $sorter: String, $tabValue: Int) {
    nodes(page: $page, limit: 15, order: $sorter, RegistryStatus: $tabValue) {
      Nodes {
        NodePublicKey
        OwnerAddress
        NodeAddress {
          Address
          Port
        }
        LockedFunds
        RegistryStatus
        ParticipationScore
      }
      Paginate {
        Page
        Count
        Total
      }
    }
  }
`

const useFetchNode = (page, sorted, tabValue) => {
  const [doFetch, { loading, data, error, called }] = useLazyQuery(GET_NODES_DATA, {
    variables: {
      page: page,
      sorter: getSortString(sorted),
      tabValue: parseInt(tabValue),
    },
  })

  return { loading, error, data, doFetch, called }
}

export default useFetchNode
