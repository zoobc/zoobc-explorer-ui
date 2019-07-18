import gql from 'graphql-tag'

const BlockQuery = gql`
  {
    block {
      Blocks {
        ID
        Hash
        Height
        Timestamp
        Generator
        TotalAmountNQT
        TotalFeeNQT
      }
    }
  }
`

export default BlockQuery
