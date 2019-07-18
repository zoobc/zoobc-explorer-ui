import React from 'react'
import { Table, Col, Card, CardBody, CardTitle } from 'reactstrap'
import { Query } from 'react-apollo'
import QRCode from 'qrcode.react'
import { useTranslation } from 'react-i18next'
import { AccountDetail } from './../../schemas'
import Loader from '../../components/Loader'
import NotFound from '../Errors/NotFound'
import ServerError from '../Errors/ServerError'

export default function AccountSummary(props) {
  const accountID = props.id
  const { t } = useTranslation()
  return (
    <Col className="pl-0" lg={{ size: 4 }}>
      <Query query={AccountDetail} variables={{ publicKey: accountID }}>
        {result => {
          if (result.loading) return <Loader />
          if (result.error) return <ServerError />
          const { accountBalance } = result.data

          if (!accountBalance) return <NotFound />
          return (
            <Card className="card">
              <CardBody>
                <CardTitle className="list-title pl-2 pb-3">Account Summary</CardTitle>
                <Table striped borderless responsive>
                  <tbody>
                    <tr>
                      <th>{t('Account ID')}</th>
                      <td>{accountBalance.ID}</td>
                    </tr>
                    <tr>
                      <th>{t('Public Key')}</th>
                      <td>{accountBalance.PublicKey}</td>
                    </tr>
                    <tr>
                      <th>{t('Balance')}</th>
                      <td>{accountBalance.Balance}</td>
                    </tr>
                    <tr>
                      <th>{t('Forged Balance')}</th>
                      <td>{accountBalance.ForgedBalance}</td>
                    </tr>
                  </tbody>
                </Table>
                <div className="d-flex flex-column mb-4">
                  <QRCode className="align-self-center" value={accountID} />
                </div>
              </CardBody>
            </Card>
          )
        }}
      </Query>
    </Col>
  )
}
