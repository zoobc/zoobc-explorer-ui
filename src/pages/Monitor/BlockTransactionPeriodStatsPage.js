import React, { Component, Fragment } from 'react'
import Chart from 'react-google-charts'
import { withTranslation } from 'react-i18next'
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'

import { Loader } from '../../components'

class BlockTransactionPeriodStatsPage extends Component {
  onChangeStartDate(e) {
    this.props.onChangeStartDate(e.target.value)
  }

  onChangeEndDate(e) {
    this.props.onChangeEndDate(e.target.value)
  }

  onSubmitFilter() {
    const { startDate, endDate } = this.props
    this.props.onFilter({ startDate, endDate })
  }

  render() {
    const { error, message, startDate = '', endDate = '', data = null, onRefresh, t } = this.props

    return (
      <Container id="blockPeriod" className="mb-4 mt-5" fluid>
        <Card>
          <CardHeader>
            <h4>{t('Block Transaction Period Stats')}</h4>
          </CardHeader>
          <CardBody>
            <div className="d-flex justify-content-center">
              {error ? (
                <label>{message}</label>
              ) : (
                <Fragment>
                  <div style={{ width: '100%' }}>
                    <Row>
                      <Col sm="6">
                        <FormGroup row>
                          <Label for="start_date" sm={2}>
                            {t('Start Date')}
                          </Label>
                          <Col sm={10}>
                            <Input
                              type="date"
                              name="date"
                              id="start_date"
                              bsSize="sm"
                              value={startDate}
                              placeholder={`t('Input start date..)`}
                              onChange={this.onChangeStartDate.bind(this)}
                              required
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col sm={2} />
                          <Col sm={10}>
                            <ButtonGroup>
                              <Button
                                outline
                                color="success"
                                size="sm"
                                onClick={this.onSubmitFilter.bind(this)}
                              >
                                {t('Filter')}
                              </Button>
                              <Button outline color="primary" size="sm" onClick={onRefresh}>
                                {t('Reset')}
                              </Button>
                            </ButtonGroup>
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup row>
                          <Label for="end_date" sm={2}>
                            {t('End Date')}
                          </Label>
                          <Col sm={10}>
                            <Input
                              type="date"
                              name="date"
                              id="end_date"
                              bsSize="sm"
                              value={endDate}
                              onChange={this.onChangeEndDate.bind(this)}
                              placeholder={t('Input end date..')}
                              required
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>

                    <hr />
                    <Row>
                      <Col>
                        <Chart
                          width={'100%'}
                          height={'400px'}
                          chartType="Bar"
                          loader={<Loader />}
                          data={data}
                          options={{
                            startup: true,
                            alwaysOutside: true,
                            duration: 2000,
                            animation: { easing: 'inAndOut' },
                          }}
                          rootProps={{ 'data-testid': 'explorer-cakep' }}
                        />
                      </Col>
                    </Row>
                  </div>
                </Fragment>
              )}
            </div>
          </CardBody>
        </Card>
      </Container>
    )
  }
}

export default withTranslation()(BlockTransactionPeriodStatsPage)
