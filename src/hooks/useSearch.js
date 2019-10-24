import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'
import { useEffect } from 'react'
import { notification } from 'antd'

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
const errorNotification = keyword => {
  notification.error({
    message: 'No Results Found',
    description:
      `No results found for keyword "${keyword}"`,
  });
}

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
        case "Block":
          history.push(`/blocks/${ID}`)
          break;
        case "Transaction":
          history.push(`/transactions/${ID}`)
          break;
        case "Account":
          history.push(`/accounts/${ID}`)
          break;
        default:
          errorNotification(keyword)
          break;
      }
    }
    else if (!!error) {
      errorNotification(keyword)
    }
  }, [keyword, data, loading, error, history])

  return { loading, error, data, doSearch, called }
}

export default useSearch
