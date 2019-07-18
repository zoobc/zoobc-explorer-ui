import React, { Component } from 'react'
import { Card, CardTitle, CardBody, Col, Table, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import _ from 'lodash'
import { withTranslation } from 'react-i18next'

import { LatestBlocksQuery } from '../../schemas'
import { shortenHash } from '../../utils/shorten'
import Loader from '../../components/Loader'
import ServerError from '../Errors/ServerError'

class BlockUpdate extends Component {
  render() {
    const { t } = this.props
    return (
      <Col className="pl-xl-0 mb-2 mb-xl-0" xl={{ size: 6 }}>
        <Card className="card">
          <CardBody>
            <div className="d-flex flex-row">
              <div className="mr-auto p-2">
                <CardTitle className="list-title">{t('Latest blocks')}</CardTitle>
              </div>
              <div className="d-flex align-items-center p-2">
                <Link to="/blocks" className="ml-auto">
                  <Button className="btn-sm" color="primary">
                    {t('View All')}
                  </Button>
                </Link>
              </div>
            </div>
            <Query query={LatestBlocksQuery}>
              {result => {
                if (result.loading) return <Loader />
                if (result.error) return <ServerError isComponent={true} />
                const { Blocks } = result.data.block
                const sortedBlocks = _.orderBy(Blocks, ['Height'], 'desc').slice(0, 5)

                return (
                  <>
                    <div className="transaction-card-container d-md-none">
                      {sortedBlocks.map((data, i) => (
                        <Card key={i} className="border mb-2">
                          <CardBody>
                            <Table borderless striped className="m-0">
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="text-secondary">
                                      <strong>{t('Height')}</strong>
                                    </div>
                                    <Link to={`/blocks/${data.ID}`}>{data.Height}</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="text-secondary">
                                      <strong>{t('Transactions')}</strong>
                                    </div>
                                    <div>{data.Transactions.length || 0}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="text-secondary">
                                      <strong>{t('Generator')}</strong>
                                    </div>
                                    <div>{shortenHash(data.Generator, 25)}</div>
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
                          <th>{t('Height')}</th>
                          <th>{t('Transactions')}</th>
                          <th>{t('Generator')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedBlocks.map((data, i) => {
                          return (
                            <tr key={i}>
                              <td>
                                <Link to={`/blocks/${data.ID}`}>{data.Height}</Link>
                              </td>
                              <td>{data.Transactions.length || 0}</td>
                              <td>{shortenHash(data.Generator, 30)}</td>
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

export default withTranslation()(BlockUpdate)
