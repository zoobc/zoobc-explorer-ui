import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const GET_SEARCH_DATA = gql`
  query getSearchData($Id: String!) {
    search(Id: $Id) {
      ID
      Height
      Timestamp
      FoundIn
    }
  }
`

const useSearch = keyword => {
  const { loading, data, error } = useQuery(GET_SEARCH_DATA, {
    variables: {
      Id: keyword,
    },
  })

  return { loading, error, data }
}

export default useSearch
