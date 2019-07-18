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
import ServerError from '../Errors/ServerError'

class TransactionAmountStatsPage extends Component {
  state = {
    selBlockId: null,
    selSenderPK: null,
    selRecipientPK: null,
    isSender: true,
    isRecipient: false,
  }

  onChangeSelectedBlock(e) {
    this.setState({ selBlockId: e.target.value })
  }

  onChangeSender() {
    this.setState({ isSender: !this.state.isSender })
  }

  onChangeSelectedSender(e) {
    this.setState({ selSenderPK: e.target.value })
  }

  onChangeRecipient() {
    this.setState({ isRecipient: !this.state.isRecipient })
  }

  onChangeSelectedRecipient(e) {
    this.setState({ selRecipientPK: e.target.value })
  }

  onSubmitFilter() {
    const { selBlockId, selSenderPK, selRecipientPK, isSender, isRecipient } = this.state
    const { blockID, senderPK, recipientPK } = this.props
    const payload = {
      blockID: selBlockId ? selBlockId : blockID,
      senderPK: isSender ? (selSenderPK ? selSenderPK : senderPK) : null,
      recipientPK: isRecipient ? (selRecipientPK ? selRecipientPK : recipientPK) : null,
    }

    this.props.onFilter(payload)
  }

  render() {
    const { isSender, isRecipient } = this.state
    const {
      error,
      listBlockIds = null,
      listSenderPKs = null,
      listRecipientPKs = null,
      data = null,
      onRefresh,
      t,
    } = this.props

    return (
      <Container id="blocks" className="mb-4 mt-5" fluid>
        <Card>
          <CardHeader>
            <h4>{t('Transaction Amount Stats')}</h4>
          </CardHeader>
          <CardBody>
            <div className="d-flex justify-content-center">
              {error ? (
                <ServerError isComponent={true} />
              ) : (
                <Fragment>
                  <div style={{ width: '100%' }}>
                    <Row>
                      <Col sm="6">
                        <FormGroup row>
                          <Label for="block" sm={2}>
                            {t('Block ID')}
                          </Label>
                          <Col sm={10}>
                            <Input
                              type="select"
                              name="select"
                              id="block"
                              bsSize="sm"
                              onChange={this.onChangeSelectedBlock.bind(this)}
                            >
                              {listBlockIds &&
                                listBlockIds.map(item => {
                                  return (
                                    <option value={item.ID} key={item.ID}>
                                      {item.ID}
                                    </option>
                                  )
                                })}
                            </Input>
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
                          <Label for="sender" sm={3} check>
                            <Input
                              type="checkbox"
                              id="sender"
                              value="Sender"
                              onChange={this.onChangeSender.bind(this)}
                              checked={isSender}
                            />{' '}
                            {t('Sender Public Key')}
                          </Label>
                          <Col sm={9}>
                            <Input
                              type="select"
                              name="select"
                              id="sender"
                              bsSize="sm"
                              onChange={this.onChangeSelectedSender.bind(this)}
                            >
                              {listSenderPKs &&
                                listSenderPKs.map(item => {
                                  return (
                                    <option value={item.SenderPublicKey} key={item.SenderPublicKey}>
                                      {item.SenderPublicKey}
                                    </option>
                                  )
                                })}
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="recipient" sm={3} check>
                            <Input
                              type="checkbox"
                              id="recipient"
                              value="Recipient"
                              onChange={this.onChangeRecipient.bind(this)}
                              checked={isRecipient}
                            />{' '}
                            {t('Recipient Public Key')}
                          </Label>
                          <Col sm={9}>
                            <Input
                              type="select"
                              name="select"
                              id="recipient"
                              bsSize="sm"
                              onChange={this.onChangeSelectedRecipient.bind(this)}
                            >
                              {listRecipientPKs &&
                                listRecipientPKs.map(item => {
                                  return (
                                    <option
                                      value={item.RecipientPublicKey}
                                      key={item.RecipientPublicKey}
                                    >
                                      {item.RecipientPublicKey}
                                    </option>
                                  )
                                })}
                            </Input>
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
                          chartType="LineChart"
                          loader={<Loader />}
                          data={data}
                          options={{
                            hAxis: {
                              title: `${t('Timestamp')}`,
                            },
                            vAxis: {
                              title: `${t('Amount')}`,
                            },
                          }}
                          rootProps={{ 'data-testid': 'explorer-amoy' }}
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

export default withTranslation()(TransactionAmountStatsPage)
