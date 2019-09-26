import React from 'react'
import { Row, Col, Card, Typography, Button, Table } from 'antd'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import moment from 'moment'

import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import { shortenHash } from '../../utils/shorten'

const { Title } = Typography

const GET_HOME_DATA = gql`
  query {
    blocks(page: 1, limit: 5, order: "-Timestamp") {
      Blocks {
        BlockID
        Height
        Timestamp
        BlocksmithID
      }
    }
    transactions(page: 1, limit: 5, order: "-Timestamp") {
      Transactions {
        TransactionID
        Timestamp
        Fee
      }
    }
  }
`

const columns = [
  {
    title: 'Height',
    dataIndex: 'Height',
    key: 'Height',
    render(text, record) {
      return <Link to={`/blocks/${record.BlockID}`}>{text}</Link>
    },
  },
  {
    title: 'Timestamp',
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(record) {
      return moment(record).format('lll')
    },
  },
  {
    title: 'Blocksmith',
    dataIndex: 'BlocksmithID',
    key: 'BlocksmithID',
    render(record) {
      return shortenHash(record, 30)
    },
  },
]

const columnsTrx = [
  {
    title: 'Transactions Id',
    dataIndex: 'TransactionID',
    key: 'TransactionID',
    render(record) {
      return <Link to={`/transactions/${record}`}>{record}</Link>
    },
  },
  {
    title: 'Timestamp',
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(record) {
      return moment(record).format('lll')
    },
  },
  {
    title: 'Fee',
    dataIndex: 'Fee',
    key: 'Fee',
  },
]

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
                columns={columns}
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
                columns={columnsTrx}
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
