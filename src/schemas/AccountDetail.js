import gql from 'graphql-tag'

const AccountQuery = gql`
  query($publicKey: String) {
    accountBalance(PublicKey: $publicKey) {
      ID
      PublicKey
      Balance
      UnconfirmedBalance
      ForgedBalance
      Height
    }
  }
`

export default AccountQuery
