import React from 'react'
import { Row, Col, Card, Typography, Button, Table } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import { blockHomeColumns, trxHomeColumns } from '../../config/table-columns'

const { Title } = Typography

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
        Fee
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
    <DefaultLayout withHero>
      <Container fluid>
        <Row gutter={8}>
          <Col span={12}>
            <Card>
              <Row>
                <Col span={21}>
                  <Title level={4}>Blocks</Title>
                </Col>
                <Col span={3}>
                  <Button
                    shape="round"
                    size="small"
                    type="primary"
                    onClick={() => history.push('/blocks')}
                  >
                    View all
                  </Button>
                </Col>
              </Row>
              <Table
                columns={blockHomeColumns}
                dataSource={blockData}
                pagination={false}
                size="small"
                loading={loading}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Row>
                <Col>
                  <Title level={4}>Transactions</Title>
                </Col>
              </Row>
              <Table
                columns={trxHomeColumns}
                dataSource={trxData}
                pagination={false}
                size="small"
                loading={loading}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  )
}

export default Home
