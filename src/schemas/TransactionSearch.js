import gql from 'graphql-tag'

const TransactionsSearch = gql`
  {
    transactions {
      ID
    }
  }
`

export default TransactionsSearch
