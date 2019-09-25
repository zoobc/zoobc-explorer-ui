import React from 'react'
import { Row, Col, Card, Typography, Table, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
const { Title } = Typography

const columns = [
  {
    title: 'Hash',
    dataIndex: 'hash',
    key: 'hash',
    render(record) {
      return <Link to={`/v1/blocks/${record}`}>{record}</Link>
    },
  },
  {
    title: 'Height',
    dataIndex: 'height',
    key: 'height',
    render(record) {
      return <Link to={`/v1/blocks/${record}`}>{record}</Link>
    },
  },
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
  {
    title: 'Blocksmith',
    dataIndex: 'blocksmith',
    key: 'blocksmith',
    render(record) {
      return <Link to="/v1">{record}</Link>
    },
  },
  {
    title: 'Fees',
    dataIndex: 'fees',
    key: 'fees',
  },
  {
    title: 'Rewards',
    dataIndex: 'rewards',
    key: 'rewards',
  },
]

const data = [
  {
    key: 1,
    hash: 'sadsajdsa8sjadjas',
    height: 23,
    timestamp: '23/9/2019',
    blocksmith: 'sadhsajhdkjas87587587sadas',
    fees: ' $3000',
    rewards: '20 points',
  },
  {
    key: 2,
    hash: 'sadsajdsa8sjadjas',
    height: 23,
    timestamp: '23/9/2019',
    blocksmith: 'sadhsajhdkjas87587587sadas',
    fees: ' $3000',
    rewards: '20 points',
  },
  {
    key: 3,
    hash: 'sadsajdsa8sjadjas',
    height: 23,
    timestamp: '23/9/2019',
    blocksmith: 'sadhsajhdkjas87587587sadas',
    fees: ' $3000',
    rewards: '20 points',
  },
  {
    key: 4,
    hash: 'sadsajdsa8sjadjas',
    height: 23,
    timestamp: '23/9/2019',
    blocksmith: 'sadhsajhdkjas87587587sadas',
    fees: ' $3000',
    rewards: '20 points',
  },
  {
    key: 5,
    hash: 'sadsajdsa8sjadjas',
    height: 23,
    timestamp: '23/9/2019',
    blocksmith: 'sadhsajhdkjas87587587sadas',
    fees: ' $3000',
    rewards: '20 points',
  },
  {
    key: 6,
    hash: 'sadsajdsa8sjadjas',
    height: 23,
    timestamp: '23/9/2019',
    blocksmith: 'sadhsajhdkjas87587587sadas',
    fees: ' $3000',
    rewards: '20 points',
  },
  {
    key: 7,
    hash: 'sadsajdsa8sjadjas',
    height: 23,
    timestamp: '23/9/2019',
    blocksmith: 'sadhsajhdkjas87587587sadas',
    fees: ' $3000',
    rewards: '20 points',
  },
  {
    key: 8,
    hash: 'sadsajdsa8sjadjas',
    height: 23,
    timestamp: '23/9/2019',
    blocksmith: 'sadhsajhdkjas87587587sadas',
    fees: ' $3000',
    rewards: '20 points',
  },
  {
    key: 9,
    hash: 'sadsajdsa8sjadjas',
    height: 23,
    timestamp: '23/9/2019',
    blocksmith: 'sadhsajhdkjas87587587sadas',
    fees: ' $3000',
    rewards: '20 points',
  },
  {
    key: 10,
    hash: 'sadsajdsa8sjadjas',
    height: 23,
    timestamp: '23/9/2019',
    blocksmith: 'sadhsajhdkjas87587587sadas',
    fees: ' $3000',
    rewards: '20 points',
  },
  {
    key: 11,
    hash: 'sadsajdsa8sjadjas',
    height: 23,
    timestamp: '23/9/2019',
    blocksmith: 'sadhsajhdkjas87587587sadas',
    fees: ' $3000',
    rewards: '20 points',
  },
  {
    key: 12,
    hash: 'sadsajdsa8sjadjas',
    height: 23,
    timestamp: '23/9/2019',
    blocksmith: 'sadhsajhdkjas87587587sadas',
    fees: ' $3000',
    rewards: '20 points',
  },
  {
    key: 13,
    hash: 'sadsajdsa8sjadjas',
    height: 23,
    timestamp: '23/9/2019',
    blocksmith: 'sadhsajhdkjas87587587sadas',
    fees: ' $3000',
    rewards: '20 points',
  },
  {
    key: 14,
    hash: 'sadsajdsa8sjadjas',
    height: 23,
    timestamp: '23/9/2019',
    blocksmith: 'sadhsajhdkjas87587587sadas',
    fees: ' $3000',
    rewards: '20 points',
  },
  {
    key: 15,
    hash: 'sadsajdsa8sjadjas',
    height: 23,
    timestamp: '23/9/2019',
    blocksmith: 'sadhsajhdkjas87587587sadas',
    fees: ' $3000',
    rewards: '20 points',
  },
]

const Blocks = () => {
  return (
    <DefaultLayout>
      <Container fluid>
        <Row gutter={8}>
          <Col span={24}>
            <Card>
              <Row>
                <Col span={24}>
                  <Title level={4}>
                    <i className="bcz-calendar" />Recent Blocks
                  </Title>
                </Col>
              </Row>
              <Table columns={columns} dataSource={data} pagination={false} size="small" />
              <Pagination className="pagination-center" current={5} total={100} />
            </Card>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  )
}

export default Blocks
