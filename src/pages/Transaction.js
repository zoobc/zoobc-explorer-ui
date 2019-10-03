import React from 'react'
import { Row, Col, Card, Typography } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import gql from 'graphql-tag'
import NumberFormat from 'react-number-format'

import DefaultLayout from '../components/DefaultLayout'
import Container from '../components/Container'
import DescItem from '../components/DescItem'
import CopyToClipboard from '../components/CopyToClipboard'
import NotFound from '../components/Errors/NotFound'
import LoaderPage from '../components/LoaderPage'

const { Title } = Typography

const GET_TRX_DATA = gql`
  query getTransaction($TrxID: String!) {
    transaction(TransactionID: $TrxID) {
      TransactionID
      Timestamp
      TransactionType
      BlockID
      Height
      Sender
      Recipient
      Confirmations
      FeeConversion
    }
  }
`

const Transaction = ({ match }) => {
  const { params } = match
  const { loading, data, error } = useQuery(GET_TRX_DATA, {
    variables: {
      TrxID: params.id,
    },
  })

  return (
    <DefaultLayout>
      {!!error && <NotFound />}
      {!!loading && <LoaderPage />}
      {!error && !loading && (
        <Container>
          <Row gutter={8}>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <Title level={4}>Transaction {data.transaction.TransactionID}</Title>
                </Col>
              </Row>
              <Card className="card-summary">
                <Title level={4}>Summary</Title>
                <DescItem
                  label="Transaction ID"
                  value={
                    <CopyToClipboard text={data.transaction.TransactionID} keyID="TransactionID" />
                  }
                />
                <DescItem
                  label="Timestamp"
                  value={moment(data.transaction.Timestamp).format('lll')}
                />
                <DescItem label="Transaction Type" value={data.transaction.TransactionType} />
                <DescItem
                  label="Block ID"
                  value={<CopyToClipboard text={data.transaction.BlockID} keyID="BlockID" />}
                />
                <DescItem label="Height" value={data.transaction.Height} />
                <DescItem
                  label="Sender"
                  value={<CopyToClipboard text={data.transaction.Sender} keyID="sender" />}
                />
                <DescItem
                  label="Recipient"
                  value={<CopyToClipboard text={data.transaction.Recipient} keyID="recipient" />}
                />
                <DescItem label="Confirmations" value={data.transaction.Confirmations} />
                <DescItem
                  label="Fee"
                  value={
                    <NumberFormat
                      value={data.transaction.FeeConversion || 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' BCZ'}
                    />
                  }
                />
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </DefaultLayout>
  )
}

export default Transaction
