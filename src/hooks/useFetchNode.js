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
      LastRefresh @client
    }
  }
`

const useFetchNode = (page, sorted, tabValue) => {
  const [doFetch, { loading, data, error, called, refetch, networkStatus }] = useLazyQuery(
    GET_NODES_DATA,
    {
      variables: {
        page: page,
        sorter: getSortString(sorted),
        tabValue: parseInt(tabValue),
      },
      notifyOnNetworkStatusChange: true,
    }
  )

  return { loading: loading || networkStatus === 4, error, data, doFetch, called, refetch }
}

export default useFetchNode
