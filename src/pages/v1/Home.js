import React from 'react'
import { Card, Button, List } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import { Row, Col } from 'reactstrap'

import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import Hero from '../../components/Hero'
import moment from 'moment'
import { shortenHash } from '../../utils/shorten'

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
        <Row>
          <Col span={12}>
            <Card>
              <h5>
                <i className="bcz-calendar" />
                <strong>Latest Blocks</strong>
              </h5>
              <List
                size="large"
                loading={loading}
                dataSource={blockData}
                className="overview-list"
                renderItem={item => (
                  <List.Item>
                    <Row style={{ width: '100%' }}>
                      <Col span={10} md="5">
                        <Col>
                          <Link to={`/blocks/${item.BlockID}`}>{item.Height}</Link>
                        </Col>
                        <Col>{moment(item.Timestamp).format('lll')}</Col>
                      </Col>
                      <Col span={14} md="7">
                        <Col>
                          <strong>Blocksmith</strong>
                        </Col>
                        <Col>{shortenHash(item.BlocksmithID, 30)}</Col>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
              <Button type="primary" onClick={() => history.push('/blocks')} block>
                VIEW ALL BLOCKS
              </Button>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <h5>
                <i className="bcz-calendar" />
                <strong>Latest Transactions</strong>
              </h5>
              <List
                size="large"
                loading={loading}
                dataSource={trxData}
                className="overview-list"
                renderItem={item => (
                  <List.Item>
                    <Row style={{ width: '100%' }}>
                      <Col md="6">
                        <Col md="12">
                          <strong>Transaction ID</strong>
                        </Col>
                        <Col md="12">
                          <Link to={`/transactions/${item.TransactionID}`}>
                            {item.TransactionID}
                          </Link>
                        </Col>
                      </Col>
                      <Col md="6">
                        <Col md="12">
                          <strong>Fee</strong>{' '}
                          {!!item.FeeConversion && (
                            <NumberFormat
                              value={item.FeeConversion}
                              displayType={'text'}
                              thousandSeparator={true}
                              suffix={' BCZ'}
                            />
                          )}
                        </Col>
                        <Col md="12">{moment(item.Timestamp).format('lll')}</Col>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
              <Button type="primary" onClick={() => history.push('/transactions')} block>
                VIEW ALL TRANSACTIONS
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  )
}

export default Home
