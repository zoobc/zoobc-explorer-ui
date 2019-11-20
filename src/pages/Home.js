import React from 'react'
import { Card, Button, List, Row, Col } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
// import { Row, Col } from 'reactstrap'
import { useTranslation } from 'react-i18next'
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

import Container from '../components/Container'
import Hero from '../components/Hero'
import moment from 'moment'
import { shortenHash } from '../utils/shorten'

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
  }
`

const Home = ({ history }) => {
  const { t } = useTranslation()
  const { loading, data } = useQuery(GET_HOME_DATA)
  let blockData = []
  let trxData = []
  let blockGraphData = []
  let trxGraphData = []

  if (!!data) {
    blockData = data.blocks.Blocks.map((block, key) => {
      return {
        key,
        ...block,
      }
    })

    trxData = data.transactions.Transactions.map((transaction, key) => {
      return {
        key,
        ...transaction,
      }
    })

    blockGraphData = data.blockGraph.map((bg, key) => {
      return {
        key,
        ...bg,
      }
    })

    trxGraphData = data.transactionGraph.map((tg, key) => {
      return {
        key,
        ...tg,
      }
    })
  }

  return (
    <>
      <Container>
        <Hero />
        <Row className="home-latest">
          <Col className="home-col-left" md={{ span: 12 }} sm={{ span: 24 }}>
            <Card className="home-card" bordered={false}>
              <h5>
                <i className="bcz-calendar" />
                <strong>{t('Latest Blocks')}</strong>
              </h5>
              <List
                size="large"
                loading={loading}
                dataSource={blockData}
                className="overview-list"
                renderItem={item => (
                  <List.Item>
                    <Row className="px-3 home-row-list">
                      <Col xl={{ span: 12 }} lg={{ span: 10 }} sm={{ span: 24 }}>
                        <div>
                          <Link to={`/blocks/${item.BlockID}`}>{item.Height}</Link>
                        </div>
                        <div>{moment(item.Timestamp).format('lll')}</div>
                      </Col>
                      <Col xl={{ span: 12 }} lg={{ span: 14 }} sm={{ span: 24 }}>
                        <div>
                          <strong>{t('Blocksmith Address')}</strong>
                        </div>
                        <div>
                          <Link to={`/accounts/${item.BlocksmithAddress}`}>
                            {shortenHash(item.BlocksmithAddress, 30)}
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
              <Button type="primary" onClick={() => history.push('/blocks')} block>
                {t('VIEW ALL BLOCKS')}
              </Button>
            </Card>
          </Col>
          <Col className="home-col-right" md={{ span: 12 }} sm={{ span: 24 }}>
            <Card className="home-card" bordered={false}>
              <h5>
                <i className="bcz-calendar" />
                <strong>{t('Latest Transactions')}</strong>
              </h5>
              <List
                size="large"
                loading={loading}
                dataSource={trxData}
                className="overview-list"
                renderItem={item => (
                  <List.Item>
                    <Row className="px-3 home-row-list">
                      <Col xl={{ span: 12 }} lg={{ span: 14 }} sm={{ span: 24 }}>
                        <div>
                          <strong>{t('Transaction ID')}</strong>
                        </div>
                        <Link to={`/transactions/${item.TransactionID}`}>{item.TransactionID}</Link>
                      </Col>
                      <Col xl={{ span: 12 }} lg={{ span: 10 }} sm={{ span: 24 }}>
                        <div>
                          <strong>{t('Fees')}</strong>{' '}
                          {!!item.FeeConversion && (
                            <NumberFormat
                              value={item.FeeConversion}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={' ZBC'}
                            />
                          )}
                        </div>
                        <div>{moment(item.Timestamp).format('lll')}</div>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
              <Button type="primary" onClick={() => history.push('/transactions')} block>
                {t('VIEW ALL TRANSACTIONS')}
              </Button>
            </Card>
          </Col>
        </Row>
        <Row className="home-latest">
          <Col className="home-col-left" md={{ span: 12 }} sm={{ span: 24 }}>
            <Card className="home-card" bordered={false}>
              <h5>
                <i className="bcz-calendar" />
                <strong>{t('Latest Block Count in 30 Days')}</strong>
              </h5>
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
                      <Line type="monotone" dataKey="amt" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </Col>
          <Col className="home-col-right" md={{ span: 12 }} sm={{ span: 24 }}>
            <Card className="home-card" bordered={false}>
              <h5>
                <i className="bcz-calendar" />
                <strong>{t('Latest Transaction Amount in 30 Days')}</strong>
              </h5>
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
                      <Line type="monotone" dataKey="amt" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home
