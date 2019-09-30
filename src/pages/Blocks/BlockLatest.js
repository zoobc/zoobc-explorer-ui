import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Table, Card, CardBody, CardTitle } from 'reactstrap'
import { Query } from 'react-apollo'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'

import { BlocksQuery } from './../../schemas'
import { shortenHash } from '../../utils/shorten'
import Clipboard from '../../components/CopyToClipboard'
import Loader from '../../components/Loader'
import ServerError from '../Errors/ServerError'

export default function BlockLatest() {
  const { t } = useTranslation()
  return (
    <Query query={BlocksQuery}>
      {result => {
        if (result.loading) return <Loader />
        if (result.error) return <ServerError />
        const { Blocks = null } = result.data.block
        const sortedBlocks = _.orderBy(Blocks, ['Height'], 'desc')

        return (
          <Container id="blocks" className="px-2 mb-4 mt-5">
            <Card className="card">
              <CardBody>
                <CardTitle className="list-title pl-2">{t('Blocks')}</CardTitle>
                <div className="d-md-none">
                  {sortedBlocks &&
                    sortedBlocks.map((item, i) => {
                      return (
                        <Card key={i} className="border mb-2">
                          <CardBody>
                            <Table borderless striped>
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="text-secondary font-weight-bold">
                                      {t('Block ID')}
                                    </div>
                                    <Link className="breaker" to={`/blocks/${item.ID}`}>
                                      {`${item.ID}`}
                                    </Link>
                                    <Clipboard keyID={`m-blockID-${i}`} text={item.ID} />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="text-secondary font-weight-bold">
                                      {t('Hash')}
                                    </div>
                                    <div className="breaker">
                                      {`${item.Hash}`}
                                      <Clipboard keyID={`m-blockHash-${i}`} text={item.Hash} />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="text-secondary font-weight-bold">
                                      {t('Height')}
                                    </div>
                                    <Link className="breaker" to={`/blocks/${item.ID}`}>{`${
                                      item.Height
                                    }`}</Link>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="text-secondary font-weight-bold">
                                      {t('Timestamp')}
                                    </div>
                                    <div>{`${item.Timestamp}`}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="text-secondary font-weight-bold">
                                      {t('Generator')}
                                    </div>
                                    <div className="breaker">{`${item.Generator}`}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="text-secondary font-weight-bold">
                                      {t('Amount')}
                                    </div>
                                    <div>{`${item.TotalAmountNQT}`}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="text-secondary font-weight-bold">
                                      {t('Fee')}
                                    </div>
                                    <div>{`${item.TotalFeeNQT}`}</div>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card>
                      )
                    })}
                </div>
                <Table striped borderless responsive className="d-none d-md-table">
                  <thead>
                    <tr>
                      <th>{t('Block ID')}</th>
                      <th>{t('Hash')}</th>
                      <th>{t('Height')}</th>
                      <th>{t('Timestamp')}</th>
                      <th>{t('Generator')}</th>
                      <th>{t('Amount')}</th>
                      <th>{t('Fee')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedBlocks &&
                      sortedBlocks.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <Link to={`/blocks/${item.ID}`}>{`${item.ID}`}</Link>
                              <Clipboard keyID={`blockID-${i}`} text={item.ID} />
                            </td>
                            <td>
                              {`${shortenHash(item.Hash)}`}
                              <Clipboard keyID={`blockHash-${i}`} text={item.Hash} />
                            </td>
                            <td>
                              <Link to={`/blocks/${item.ID}`}>{`${item.Height}`}</Link>
                            </td>
                            <td>{`${item.Timestamp}`}</td>
                            <td>{`${shortenHash(item.Generator)}`}</td>
                            <td>{`${item.TotalAmountNQT}`}</td>
                            <td>{`${item.TotalFeeNQT}`}</td>
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
