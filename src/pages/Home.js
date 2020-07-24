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
      RegistryStatus
      CountryCode
      CountryName
      RegionCode
      RegionName
      City
      Latitude
      Longitude
      CountryFlagUrl
      NodeAddress {
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
    const newBlocks = data.blocks.map(block => ({ key: block.Timestamp, ...block }))
    blockData = [...newBlocks, ...oldBlocks.slice(0, blockData.length - newBlocks.length)]
  }

  if (subscriptTransactions && !subscriptTransactions.loading) {
    const oldTrxData = trxData
    const { data } = subscriptTransactions
    const newTrxData = data.transactions.map(transaction => ({
      key: transaction.Timestamp,
      ...transaction,
    }))
    blockData = [...newTrxData, ...oldTrxData.slice(0, trxData.length - newTrxData.length)]
  }

  return (
    <>
      <div style={{ backgroundColor: 'white', paddingTop: 30 }}>
        <Container>
          <Row>
            <Banner />
          </Row>
        </Container>
      </div>
      <Container>
        <Hero />
        <Row className="home-card">
          <Col className="home-col-left" md={{ span: 12 }} sm={{ span: 24 }}>
            <Card bordered={false}>
              <div className="home-card-title">
                <i className="bcz-calendar" />
                <strong>{t('Latest Blocks')}</strong>
              </div>
              <TableAnim loading={loading} columns={latestBlockColumns} data={blockData} />
              <Button type="primary" onClick={() => history.push('/blocks')} block>
                {t('VIEW ALL BLOCKS')}
              </Button>
            </Card>
          </Col>
          <Col className="home-col-right" md={{ span: 12 }} sm={{ span: 24 }}>
            <Card bordered={false}>
              <div className="home-card-title">
                <i className="bcz-calendar" />
                <strong>{t('Latest Transactions')}</strong>
              </div>
              <TableAnim loading={loading} columns={latestTransactionColumns} data={trxData} />
              <Button type="primary" onClick={() => history.push('/transactions')} block>
                {t('VIEW ALL TRANSACTIONS')}
              </Button>
            </Card>
          </Col>
        </Row>

        <Row className="home-card">
          <Col className="home-col-left" md={{ span: 12 }} sm={{ span: 24 }}>
            <Card bordered={false}>
              <div className="home-card-title">
                <i className="bcz-calendar" />
                <strong>{t('Latest Block Count in 30 Days')}</strong>
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
                        name={t('Block Count')}
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
                <strong>{t('Latest Transaction Amount in 30 Days')}</strong>
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
                        name={t('Transaction Amount')}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {data && data.maps && data.maps.length > 0 && (
          <MapNodes loading={loading} data={data && data.maps} />
        )}
      </Container>
    </>
  )
}

export default Home
