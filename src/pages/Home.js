import React, { useState } from 'react'
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

import { Container, Hero, Banner, MapNodes, TableAnim, RaceCar } from '../components'
import { latestBlockColumns, latestTransactionColumns } from '../config/table-columns'
import useInterval from '../hooks/useInterval'
import { getRandomIndex } from '../utils'

const GET_HOME_DATA = gql`
  query {
    blocks(page: 1, limit: 5, order: "-Height") {
      Blocks {
        BlockID
        Height
        Timestamp
        BlocksmithAddress
        TotalFeeConversion
        TotalTransaction
      }
    }
    transactions(page: 1, limit: 5, order: "-Height") {
      Transactions {
        TransactionID
        TransactionHashFormatted
        Timestamp
        FeeConversion
        Height
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
      NodePublicKeyFormatted
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
      TotalFeeConversion
      TotalTransaction
    }
  }
`

const GET_SUBSCRIPTION_TRANSACTIONS = gql`
  subscription transactions {
    transactions {
      TransactionID
      TransactionHashFormatted
      Timestamp
      FeeConversion
      Height
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
  const [iteration, setIteration] = useState(0)
  const [dataRace, setDataRace] = useState([
    {
      name: 'ZBC_3WWDF4S2_IZVG2HHD_VOPSCNGN_COLYZ2OZ_M4QJZ4OL_44YHTKVC_2TPZBZAU',
      value: 10,
      color: '#f4efd3',
    },
    {
      name: 'ZBC_5OBRYSC3_W5JDB34V_X7J2GEZZ_GUQXRM6E_IGH45J7W_OD2OPMKU_PARNJPHQ',
      value: 15,
      color: '#cccccc',
    },
    {
      name: 'ZBC_DO34XNYK_F5FQA5V7_37M5H56D_MSQKDYGS_55O7C52V_73MDNKHO_G6BI6FWN',
      value: 20,
      color: '#c2b0c9',
    },
    {
      name: 'ZBC_F5YUYDXD_WFDJSAV5_K3Y72RCM_GLQP32XI_QDVXOGGD_J7CGSSSK_5VKR7YML',
      value: 25,
      color: '#9656a1',
    },
    {
      name: 'ZBC_EVPOXJZV_E74GT6HI_EZVWDCFM_IM24M7BC_VJHZGGGA_YASWWADH_VCDBIV6P',
      value: 30,
      color: '#fa697c',
    },
    {
      name: 'ZBC_F6CRZPOG_C42A7M37_WRL2EVBV_KA5PKBGI_SBGVZHMH_VIFZ7CMQ_VMOFWD3P',
      value: 35,
      color: '#fcc169',
    },
    {
      name: 'ZBC_ALI45_PARTO_NOTO_BOTO_LIMO_TIBO_SIJI',
      value: 10,
      color: '#fae37c',
    },
    {
      name: 'ZBC_MICHAEL_SUJONO_RADEN_TUMENGGUNG',
      value: 5,
      color: '#fcff69',
    },
  ])

  let blockData = []
  let trxData = []
  let blockGraphData = []
  let trxGraphData = []

  if (!!data) {
    blockGraphData = data.blockGraph.map((bg, key) => ({ key, ...bg }))
    trxGraphData = data.transactionGraph.map((tg, key) => ({ key, ...tg }))
    blockData = data.blocks.Blocks.map(block => ({ key: block.BlockID, ...block }))
    trxData = data.transactions.Transactions.map(tx => ({ key: tx.TransactionID, ...tx }))
  }

  if (subscriptBlocks && !subscriptBlocks.loading && !subscriptBlocks.error) {
    const oldBlocks = blockData
    const { data } = subscriptBlocks
    if (data) {
      const newBlocks = data.blocks.map(block => ({ key: block.BlockID, ...block }))
      blockData = [...newBlocks, ...oldBlocks.slice(0, blockData.length - newBlocks.length)]
    }
  }

  if (subscriptTransactions && !subscriptTransactions.loading && !subscriptTransactions.error) {
    const oldTrxData = trxData
    const { data } = subscriptTransactions
    if (data) {
      const newTrxData = data.transactions.map(tx => ({ key: tx.TransactionID, ...tx }))
      blockData = [...newTrxData, ...oldTrxData.slice(0, trxData.length - newTrxData.length)]
    }
  }

  useInterval(() => {
    const randomIndex = getRandomIndex(dataRace)
    setDataRace(
      dataRace.map((entry, index) =>
        index === randomIndex
          ? {
              ...entry,
              value: entry.value + 5,
            }
          : entry
      )
    )
    setIteration(iteration + 1)
  }, 1000)

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
              <TableAnim
                loading={loading}
                columns={latestBlockColumns}
                data={blockData}
                className="table-anim-block"
              />
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
              <TableAnim
                loading={loading}
                columns={latestTransactionColumns}
                data={trxData}
                className="table-anim-trx"
              />
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

        <RaceCar loading={loading} data={dataRace} />

        {data && data.maps && data.maps.length > 0 && checkLatLong(data.maps) && (
          <MapNodes loading={loading} data={data && data.maps} />
        )}
      </Container>
    </>
  )
}

export default Home
