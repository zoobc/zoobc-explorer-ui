import gql from 'graphql-tag'

const AccountList = gql`
  {
    accountBalances {
      ID
      PublicKey
      Balance
      UnconfirmedBalance
      ForgedBalance
      Height
    }
  }
`

export default AccountList
