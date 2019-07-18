import gql from 'graphql-tag'

const LatestBlockQuery = gql`
  {
    block {
      Blocks {
        ID
        Height
        Generator
        Transactions {
          ID
        }
      }
    }
  }
`

export default LatestBlockQuery
