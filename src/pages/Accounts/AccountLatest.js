import React from 'react'
import { Table, Container, Card, CardBody, CardTitle } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { useTranslation } from 'react-i18next'

import { shortenHash } from '../../utils/shorten'
import { AccountList } from '../../schemas'
import Loader from '../../components/Loader'
import ServerError from '../Errors/ServerError'

export default function AccountLatest() {
  const { t } = useTranslation()
  return (
    <Query query={AccountList}>
      {result => {
        if (result.loading) {
          return <Loader />
        } else if (result.error) {
          return <ServerError />
        }
        const { accountBalances = [] } = result.data
        return (
          <Container id="account-details" className="px-2 mb-4 mt-5">
            <Card className="card">
              <CardBody>
                <CardTitle className="list-title pl-2">{t('Accounts')}</CardTitle>
                <Table striped borderless responsive>
                  <thead>
                    <tr>
                      <th>{t('Account ID')}</th>
                      <th>{t('Public Key')}</th>
                      <th>{t('Balance')}</th>
                      <th>{t('Unconfirmed Balance')}</th>
                      <th>{t('Forged Balance')}</th>
                      <th>{t('Height')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountBalances.map((data, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <Link to={`/accounts/detail?pk=${data.PublicKey}`}>{data.ID}</Link>
                          </td>
                          <td>{shortenHash(data.PublicKey, 30)}</td>
                          <td>{data.Balance}</td>
                          <td>{data.UnconfirmedBalance}</td>
                          <td>{data.ForgedBalance}</td>
                          <td>{data.Height}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Container>
        )
      }}
    </Query>
  )
}
