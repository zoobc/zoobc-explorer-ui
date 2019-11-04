import React from 'react'
import { Card, Button, List, Row, Col } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
// import { Row, Col } from 'reactstrap'
import { useTranslation } from 'react-i18next'

import DefaultLayout from '../components/DefaultLayout'
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
        BlocksmithID
      }
    }
    transactions(page: 1, limit: 5, order: "-Height") {
      Transactions {
        TransactionID
        Timestamp
        FeeConversion
      }
    }
  }
`

const Home = ({ history }) => {
  const { t } = useTranslation()
  const { loading, data } = useQuery(GET_HOME_DATA)
  let blockData = []
  let trxData = []

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
  }

  return (
    <DefaultLayout>
      <Container>
        <Hero />
        <Row className="home-latest">
          <Col className="home-col-left">
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
                    <Row>
                      <Col className="home-col-list">
                        <div>
                          <Link to={`/blocks/${item.BlockID}`}>{item.Height}</Link>
                        </div>
                        <div>{moment(item.Timestamp).format('lll')}</div>
                      </Col>
                      <Col className="home-col-list">
                        <div>
                          <strong>{t('Blocksmith')}</strong>
                        </div>
                        <div>{shortenHash(item.BlocksmithID, 30)}</div>
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
          <Col className="home-col-right">
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
                    <Row>
                      <Col className="home-col-list">
                        <div>
                          <strong>{t('Transaction ID')}</strong>
                        </div>
                        <div>
                          <Link to={`/transactions/${item.TransactionID}`}>
                            {item.TransactionID}
                          </Link>
                        </div>
                      </Col>
                      <Col className="home-col-list">
                        <div>
                          <strong>{t('Fees')}</strong>{' '}
                          {!!item.FeeConversion && (
                            <NumberFormat
                              value={item.FeeConversion}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={' BCZ'}
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
      </Container>
    </DefaultLayout>
  )
}

export default Home
