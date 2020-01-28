import React, { useEffect } from 'react'
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

let game
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
          color: 'rgba(0, 0, 0, 0)',
          drawBorder: false,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          display: true,
        },
        gridLines: {
          display: false,
          color: 'rgba(0, 0, 0, 0)',
          drawBorder: false,
        },
      },
    ],
  },
  tooltips: {
    mode: 'label',
  },
  legend: {
    display: false,
  },
}

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

  useEffect(() => {
    creatChart()
  }, [])

  const creatChart = () => {
    const sun = new Image()
    const cloud = new Image()
    const canvas = document.getElementById('game')
    sun.src = 'https://i.imgur.com/yDYW1I7.png'
    cloud.src = 'https://i.imgur.com/DIbr9q1.png'

    window.Chart.pluginService.register({
      afterUpdate: function(chart) {
        chart.config.data.datasets[0]._meta[0].data[0]._model.pointStyle = sun
        chart.config.data.datasets[0]._meta[0].data[1]._model.pointStyle = sun
        chart.config.data.datasets[0]._meta[0].data[2]._model.pointStyle = sun
        chart.config.data.datasets[0]._meta[0].data[3]._model.pointStyle = sun
        chart.config.data.datasets[0]._meta[0].data[4]._model.pointStyle = sun
        chart.config.data.datasets[0]._meta[0].data[5]._model.pointStyle = sun
        chart.config.data.datasets[0]._meta[0].data[6]._model.pointStyle = sun
        chart.config.data.datasets[0]._meta[0].data[7]._model.pointStyle = sun
        chart.config.data.datasets[0]._meta[0].data[8]._model.pointStyle = sun
        chart.config.data.datasets[0]._meta[0].data[9]._model.pointStyle = sun
      },
    })
    var data = {
      labels: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'],
      datasets: [
        {
          label: 'ZBC',
          fill: false,
          borderColor: 'rgba(0, 0, 0, 0)',
          pointBackgroundColor: '#fff',
          pointRadius: 5,
          data: [
            randomNumber(),
            randomNumber(),
            randomNumber(),
            randomNumber(),
            randomNumber(),
            randomNumber(),
            randomNumber(),
            randomNumber(),
            randomNumber(),
            randomNumber(),
            randomNumber(),
            randomNumber(),
          ],
        },
      ],
    }

    game = window.Chart.Line(canvas, {
      data: data,
      options,
    })
  }

  const randomNumber = () => Math.floor(Math.random() * 500) + 1

  const onClickButton = () => {
    game.data.datasets[0].data = [
      randomNumber(),
      randomNumber(),
      randomNumber(),
      randomNumber(),
      randomNumber(),
      randomNumber(),
      randomNumber(),
      randomNumber(),
      randomNumber(),
      randomNumber(),
      randomNumber(),
      randomNumber(),
    ]
    game.update()
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
        <Button onClick={onClickButton}>Refresh</Button>
        <Card className="home-card" bordered={false} style={{ marginBottom: 20 }}>
          <canvas id="game" height="100"></canvas>
        </Card>
      </Container>
    </>
  )
}

export default Home
