import { getSortString } from '../utils'
import { useLazyQuery, gql } from '@apollo/client'

const GET_NODES_DATA = gql`
  query getNodes($page: Int, $sorter: String, $tabValue: Int) {
    nodes(page: $page, limit: 15, order: $sorter, RegistrationStatus: $tabValue) {
      Nodes {
        NodePublicKey
        OwnerAddress
        NodeAddressInfo {
          Address
          Port
        }
        LockedFunds
        RegistrationStatus
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
