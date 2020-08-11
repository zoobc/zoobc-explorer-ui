import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Button, Row, Col } from 'antd'
import { useQuery, useSubscription, gql } from '@apollo/client'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import { Container, Hero, Banner, MapNodes, TableAnim } from '../components'
import { latestBlockColumns, latestTransactionColumns } from '../config/table-columns'

const GET_HOME_DATA = gql`
  query {
    blocks(page: 1, limit: 5, order: "-Height") {
      Blocks {
        BlockID
        Height
        Timestamp
        BlocksmithAddress
      }
    }
    transactions(page: 1, limit: 5, order: "-Height") {
      Transactions {
        TransactionID
        Timestamp
        FeeConversion
      }
    }
    blockGraph {
      name
      amt
    }
    transactionGraph {
      name
      amt
    }
    maps {
      NodeID
      NodePublicKey
      OwnerAddress
      RegistrationStatus
      CountryCode
      CountryName
      RegionCode
      RegionName
      City
      Latitude
      Longitude
      CountryFlagUrl
      NodeAddressInfo {
        Address
        Port
      }
    }
  }
`

const GET_SUBSCRIPTION_BLOCKS = gql`
  subscription blocks {
    blocks {
      BlockID
      Height
      Timestamp
      BlocksmithAddress
    }
  }
`

const GET_SUBSCRIPTION_TRANSACTIONS = gql`
  subscription transactions {
    transactions {
      TransactionID
      Timestamp
      FeeConversion
    }
  }
`

const checkLatLong = data => {
  const containLatLong = data.filter(item => !!item.Latitude || !!item.Longitude)

  if (containLatLong.length > 0) return true

  return false
}

const Home = ({ history }) => {
  const { t } = useTranslation()
  const { loading, data } = useQuery(GET_HOME_DATA)
  const subscriptBlocks = useSubscription(GET_SUBSCRIPTION_BLOCKS)
  const subscriptTransactions = useSubscription(GET_SUBSCRIPTION_TRANSACTIONS)

  let blockData = []
  let trxData = []
  let blockGraphData = []
  let trxGraphData = []

  if (!!data) {
    blockGraphData = data.blockGraph.map((bg, key) => ({ key, ...bg }))
    trxGraphData = data.transactionGraph.map((tg, key) => ({ key, ...tg }))
    blockData = data.blocks.Blocks.map(block => ({ key: block.Timestamp, ...block }))
    trxData = data.transactions.Transactions.map(transaction => ({
      key: transaction.Timestamp,
      ...transaction,
    }))
  }

  if (subscriptBlocks && !subscriptBlocks.loading) {
    const oldBlocks = blockData
    const { data } = subscriptBlocks
    if (data) {
      const newBlocks = data.blocks.map(block => ({ key: block.Timestamp, ...block }))
      blockData = [...newBlocks, ...oldBlocks.slice(0, blockData.length - newBlocks.length)]
    }
  }

  if (subscriptTransactions && !subscriptTransactions.loading) {
    const oldTrxData = trxData
    const { data } = subscriptTransactions
    if (data) {
      const newTrxData = data.transactions.map(transaction => ({
        key: transaction.Timestamp,
        ...transaction,
      }))
      blockData = [...newTrxData, ...oldTrxData.slice(0, trxData.length - newTrxData.length)]
    }
  }

  return (
    <>
      <Container>
        <Banner />
        <Hero />
        <Row className="home-card">
          <Col className="home-col-left" md={{ span: 12 }} sm={{ span: 24 }}>
            <Card bordered={false}>
              <div className="home-card-title">
                <i className="bcz-calendar" />
                <strong>{t('latest blocks')}</strong>
              </div>
              <TableAnim loading={loading} columns={latestBlockColumns} data={blockData} />
              <Button type="primary" onClick={() => history.push('/blocks')} block>
                {t('view all blocks')}
              </Button>
            </Card>
          </Col>
          <Col className="home-col-right" md={{ span: 12 }} sm={{ span: 24 }}>
            <Card bordered={false}>
              <div className="home-card-title">
                <i className="bcz-calendar" />
                <strong>{t('latest transactions')}</strong>
              </div>
              <TableAnim loading={loading} columns={latestTransactionColumns} data={trxData} />
              <Button type="primary" onClick={() => history.push('/transactions')} block>
                {t('view all transactions')}
              </Button>
            </Card>
          </Col>
        </Row>

        <Row className="home-card">
          <Col className="home-col-left" md={{ span: 12 }} sm={{ span: 24 }}>
            <Card bordered={false}>
              <div className="home-card-title">
                <i className="bcz-calendar" />
                <strong>{t('latest block count in 30 days')}</strong>
              </div>
              <div className="graph">
                <div className="graph-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={blockGraphData}
                      margin={{
                        top: 20,
                        right: 0,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="amt"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        name={t('block count')}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </Col>
          <Col className="home-col-right" md={{ span: 12 }} sm={{ span: 24 }}>
            <Card bordered={false}>
              <div className="home-card-title">
                <i className="bcz-calendar" />
                <strong>{t('latest transaction amount in 30 days')}</strong>
              </div>
              <div className="graph">
                <div className="graph-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trxGraphData}
                      margin={{
                        top: 20,
                        right: 0,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="amt"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        name={t('transaction amount')}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {data && data.maps && data.maps.length > 0 && checkLatLong(data.maps) && (
          <MapNodes loading={loading} data={data && data.maps} />
        )}
      </Container>
    </>
  )
}

export default Home
