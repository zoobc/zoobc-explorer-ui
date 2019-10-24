import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'
import { useEffect } from 'react'

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

const useSearch = (keyword, history) => {
  const [doSearch, { loading, data, error, called }] = useLazyQuery(GET_SEARCH_DATA, {
    variables: {
      Id: keyword,
    },
  })

  useEffect(() => {
    if (!!data && !error && !loading) {
      const { ID, FoundIn } = data.search
      switch (FoundIn) {
        case 'Block':
          history.push(`/blocks/${ID}`)
          break
        case 'Transaction':
          history.push(`/transactions/${ID}`)
          break
        case 'Account':
          history.push(`/accounts/${ID}`)
          break
        default:
          history.push({
            pathname: '/not-found',
            state: { keyword: keyword },
          })
          break
      }
    } else if (!!error) {
      history.push({
        pathname: '/not-found',
        state: { keyword: keyword },
      })
    }
  }, [keyword, data, loading, error, history])

  return { loading, error, data, doSearch, called }
}

export default useSearch
