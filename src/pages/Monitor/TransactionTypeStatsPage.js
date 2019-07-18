import React, { Component } from 'react'
import Chart from 'react-google-charts'
import { Container, Card, CardHeader, CardBody, Button, Row, Col } from 'reactstrap'
import { withTranslation } from 'react-i18next'

import Loader from '../../components/Loader'
import ServerError from '../Errors/ServerError'

class TransactionTypeStatsPage extends Component {
  render() {
    const {
      transactionType,
      blockSummary,
      onRefreshTransactionType,
      onRefreshBlockSummary,
      t,
    } = this.props

    return (
      <Container id="blocks" className="mb-4" fluid>
        <Row className="my-4">
          <Col md="6">
            <Card>
              <CardHeader>
                <Row>
                  <Col sm="8">
                    <h4>{t('Transaction Type Summary')}</h4>
                  </Col>
                  <Col sm="4" className="text-right">
                    <Button outline color="primary" size="sm" onClick={onRefreshTransactionType}>
                      {t('Refresh')}
                    </Button>
                  </Col>
                  <div />
                </Row>
              </CardHeader>
              <CardBody>
                <div className="d-flex justify-content-center">
                  {transactionType.error ? (
                    <ServerError isComponent={true} />
                  ) : (
                    <Chart
                      width={'600px'}
                      height={'400px'}
                      chartType="PieChart"
                      loader={<Loader />}
                      data={transactionType.data}
                      options={{
                        is3D: true,
                      }}
                      rootProps={{ 'data-testid': 'explorer-cakep' }}
                    />
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                <Row>
                  <Col sm="8">
                    <h4>{t('Block & Transaction Summary')}</h4>
                  </Col>
                  <Col sm="4" className="text-right">
                    <Button outline color="primary" size="sm" onClick={onRefreshBlockSummary}>
                      {t('Refresh')}
                    </Button>
                  </Col>
                  <div />
                </Row>
              </CardHeader>
              <CardBody>
                <div className="d-flex justify-content-center">
                  {blockSummary.error ? (
                    <ServerError isComponent={true} />
                  ) : (
                    <Chart
                      width={'600px'}
                      height={'400px'}
                      chartType="PieChart"
                      loader={<Loader />}
                      data={blockSummary.data}
                      options={{
                        is3D: true,
                      }}
                      rootProps={{ 'data-testid': 'explorer-cakep' }}
                    />
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withTranslation()(TransactionTypeStatsPage)
