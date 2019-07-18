import React from 'react'
import { Container, Table, Card, CardBody, CardTitle } from 'reactstrap'
import { Query } from 'react-apollo'
import { useTranslation } from 'react-i18next'

import Loader from '../../components/Loader'
import { PeersQuery } from '../../schemas'
import ServerError from '../Errors/ServerError'

export default function Peers() {
  const { t } = useTranslation()
  return (
    <Query query={PeersQuery}>
      {result => {
        if (result.loading) {
          return <Loader />
        } else if (result.error) {
          return <ServerError />
        }
        const { peers = [] } = result.data
        return (
          <Container id="peers" className="px-2 mb-4 mt-5">
            <Card className="card">
              <CardBody>
                <CardTitle className="list-title pl-2">{t('Peers')}</CardTitle>
                <div className="d-md-none">
                  {peers &&
                    peers.map((item, i) => {
                      return (
                        <Card key={i} className="border mb-2">
                          <CardBody>
                            <Table borderless striped>
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="text-secondary font-weight-bold">{t('IP')}</div>
                                    {`${item.Address}`}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="text-secondary font-weight-bold">
                                      {t('Announced')}
                                    </div>
                                    <div className="breaker">{`${item.AnnouncedAddress}`}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="text-secondary font-weight-bold">
                                      {t('Port')}
                                    </div>
                                    {`${item.Port}`}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="text-secondary font-weight-bold">
                                      {t('State')}
                                    </div>
                                    <div>{`${item.State}`}</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="text-secondary font-weight-bold">
                                      {t('Version')}
                                    </div>
                                    <div className="breaker">{`${item.Version}`}</div>
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
                      <th>{t('IP')}</th>
                      <th>{t('Announced')}</th>
                      <th>{t('Port')}</th>
                      <th>{t('State')}</th>
                      <th>{t('Version')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {peers.map((data, i) => {
                      return (
                        <tr key={i}>
                          <td>{data.Address}</td>
                          <td>{data.AnnouncedAddress}</td>
                          <td>{data.Port}</td>
                          <td>{data.State}</td>
                          <td>{data.Version}</td>
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
