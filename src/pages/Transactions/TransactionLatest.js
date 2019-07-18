import React from 'react'
import { Table, Container, Card, CardBody, CardTitle } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { useTranslation } from 'react-i18next'
import { TransactionsQuery } from '../../schemas'
import { shortenHash } from '../../utils/shorten'
import Clipboard from '../../components/CopyToClipboard'
import Loader from '../../components/Loader'
import ServerError from '../Errors/ServerError'

export default function TransactionLatest() {
  const { t } = useTranslation()
  return (
    <Query query={TransactionsQuery}>
      {result => {
        if (result.loading) {
          return <Loader />
        } else if (result.error) {
          return <ServerError />
        }
        const { transactions = [] } = result.data
        return (
          <Container id="transactions" className="px-2 mb-4 mt-5">
            <Card className="card">
              <CardBody>
                <CardTitle className="list-title pl-2">{t('Transactions')}</CardTitle>
                <div className="d-md-none">
                  {transactions.map((data, i) => (
                    <Card key={i} className="border mb-2">
                      <CardBody>
                        <Table borderless striped className="m-0">
                          <tbody>
                            <tr>
                              <td>
                                <div className="text-secondary font-weight-bold">
                                  {t('Block ID')}
                                </div>
                                <Link className="breaker" to={`/blocks/${data.BlockID}`}>
                                  {data.BlockID}
                                </Link>
                                <Clipboard keyID={`m-blockID-${i}`} text={data.BlockID} />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="text-secondary font-weight-bold">
                                  {t('Transaction ID')}
                                </div>
                                <Link to={`/transactions/${data.ID}`}>{data.ID}</Link>
                                <Clipboard keyID={`m-txID-${i}`} text={data.ID} />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="text-secondary font-weight-bold">{t('Sender')}</div>
                                <Link
                                  className="breaker"
                                  to={`/accounts/detail?pk=${data.SenderPublicKey}`}
                                >
                                  {data.SenderPublicKey}
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="text-secondary font-weight-bold">{t('Type')}</div>
                                <div>{data.Type}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="text-secondary font-weight-bold">{t('Amount')}</div>
                                <div>{data.AmountNQT}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="text-secondary font-weight-bold">{t('Fee')}</div>
                                <div>{data.FeeNQT}</div>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  ))}
                </div>
                <Table className="d-none d-md-table" striped borderless responsive>
                  <thead>
                    <tr>
                      <th>{t('Block ID')}</th>
                      <th>{t('Transaction ID')}</th>
                      <th>{t('Sender')}</th>
                      <th>{t('Type')}</th>
                      <th>{t('Amount')}</th>
                      <th>{t('Fee')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((data, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <Link to={`/blocks/${data.BlockID}`}>{data.BlockID}</Link>
                            <Clipboard keyID={`blockID-${i}`} text={data.BlockID} />
                          </td>
                          <td>
                            <Link to={`/transactions/${data.ID}`}>{data.ID}</Link>
                            <Clipboard keyID={`txID-${i}`} text={data.ID} />
                          </td>
                          <td>
                            <Link to={`/accounts/detail?pk=${data.SenderPublicKey}`}>
                              {shortenHash(data.SenderPublicKey, 30)}
                            </Link>
                          </td>
                          <td>{data.Type}</td>
                          <td>{data.AmountNQT}</td>
                          <td>{data.FeeNQT}</td>
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
