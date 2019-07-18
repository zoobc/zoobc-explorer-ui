import gql from 'graphql-tag'

const BlockSearch = gql`
  {
    block {
      Blocks {
        ID
      }
    }
  }
`

export default BlockSearch
