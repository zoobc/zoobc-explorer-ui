import React, { Component } from 'react'
import Chart from 'react-google-charts'
import { Container, Card, CardHeader, CardBody, Button, Row, Col } from 'reactstrap'
import Loader from '../../components/Loader'

export default class TransactionStatsPage extends Component {
  render() {
    const { loading, data = null, onRefresh } = this.props

    return (
      <Container id="blocks" className="mb-4" fluid>
        <Card>
          <CardHeader>
            <Row>
              <Col sm="6">
                <h4>Transaction Stats</h4>
              </Col>
              <Col sm="6" className="text-right">
                <Button outline color="primary" size="sm" onClick={onRefresh}>
                  Refresh
                </Button>
              </Col>
              <div />
            </Row>
          </CardHeader>
          <CardBody>
            {loading ? (
              <Loader />
            ) : (
              <Chart
                width={'100%'}
                height={'400px'}
                chartType="LineChart"
                loader={<Loader />}
                data={data}
                options={{
                  hAxis: {
                    title: 'Block',
                  },
                  vAxis: {
                    title: 'Transactions',
                  },
                }}
                rootProps={{ 'data-testid': '1' }}
              />
            )}
          </CardBody>
        </Card>
      </Container>
    )
  }
}
