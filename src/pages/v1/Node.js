import React from 'react'
import { Row, Col, Card, Typography, Table, Pagination, Badge } from 'antd'
import { Link } from 'react-router-dom'
import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import DescItem from '../../components/DescItem'

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

const Node = () => {
  return (
    <DefaultLayout>
      <Container fluid>
        <Row gutter={8}>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <Title level={4}>Node #123456</Title>
              </Col>
            </Row>
            <Card className="card-summary">
              <Title level={4}>Summary</Title>
              <DescItem label="Registy Status" value="Registered" />
              <DescItem label="Owner Account" value="djsagjdgajsgdjsa" />
              <DescItem label="PoP Score" value="20" />
              <DescItem label="Block Found" value="20" />
              <DescItem label="Reward paid" value="20" />
              <DescItem label="IP Address" value="192.168.1.1" />
              <DescItem label="Locked Fund" value="80" />
              <DescItem label="Queue Position" value="5" />
            </Card>
            <Card>
              <Title level={4}>
                Blocks <Badge className="badge-black" count={425} overflowCount={1000} />
              </Title>
              <Table columns={columns} dataSource={[]} pagination={false} size="small" />
              <Pagination className="pagination-center" current={5} total={100} />
            </Card>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  )
}

export default Node
