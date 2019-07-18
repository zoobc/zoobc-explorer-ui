import React, { Component } from 'react'
import { Card, CardTitle, CardBody, Col, Table, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import _ from 'lodash'
import { withTranslation } from 'react-i18next'

import { LatestTransactionsQuery } from '../../schemas'
import { shortenHash } from '../../utils/shorten'
import Loader from '../../components/Loader'
import ServerError from '../Errors/ServerError'

class TransactionUpdate extends Component {
  render() {
    const { t } = this.props
    return (
      <Col className="pr-xl-0" xl={{ size: 6 }}>
        <Card className="card">
          <CardBody>
            <div className="d-flex flex-row">
              <div className="mr-auto p-2">
                <CardTitle className="list-title">{t('Latest transactions')}</CardTitle>
              </div>
              <div className="d-flex align-items-center p-2">
                <Link to="/transactions" className="ml-auto">
                  <Button className="btn-sm" color="primary">
                    {t('View All')}
                  </Button>
                </Link>
              </div>
            </div>
            <Query query={LatestTransactionsQuery}>
              {result => {
                if (result.loading) return <Loader />
                if (result.error) return <ServerError isComponent={true} />
                const { transactions } = result.data
                const sortedTransactions = _.orderBy(transactions, ['Timestamp'], 'desc').slice(
                  0,
                  5
                )
                return (
                  <>
                    <div className="transaction-card-container d-md-none">
                      {sortedTransactions.map((data, i) => (
                        <Card key={i} className="border mb-2">
                          <CardBody>
                            <Table borderless striped className="m-0">
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="text-secondary">
                                      <strong>{t('Transaction ID')}</strong>
                                    </div>
                                    <Link to={`/blocks/${data.ID}`}>{data.ID}</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="text-secondary">
                                      <strong>{t('Sender')}</strong>
                                    </div>
                                    <div>{shortenHash(data.SenderPublicKey, 25)}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="text-secondary">
                                      <strong>{t('Type')}</strong>
                                    </div>
                                    <div>{data.Type}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                    <Table striped borderless responsive className="d-none d-md-table">
                      <thead>
                        <tr>
                          <th>{t('Transaction ID')}</th>
                          <th>{t('Sender')}</th>
                          <th>{t('Type')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedTransactions.map((data, i) => {
                          return (
                            <tr key={i}>
                              <td>
                                <Link to={`/transactions/${data.ID}`}>{data.ID}</Link>
                              </td>
                              <td>{shortenHash(data.SenderPublicKey, 29)}</td>
                              <td>{data.Type}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </>
                )
              }}
            </Query>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default withTranslation()(TransactionUpdate)
