import gql from 'graphql-tag'

const LatestTransactionsQuery = gql`
  {
    transactions {
      ID
      SenderPublicKey
      Type
      Timestamp
    }
  }
`

export default LatestTransactionsQuery
