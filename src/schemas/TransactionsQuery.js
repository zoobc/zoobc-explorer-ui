import gql from 'graphql-tag'

const TransactionsQuery = gql`
  {
    transactions {
      ID
      BlockID
      Deadline
      SenderPublicKey
      RecipientPublicKey
      AmountNQT
      FeeNQT
      EcBlockHeight
      EcBlockID
      Version
      Timestamp
      Signature
      Type
      Height
      Hash
    }
  }
`

export default TransactionsQuery
