import React from 'react'
import { Row, Col, Card, Typography, Table, Pagination, Badge } from 'antd'
import { Link } from 'react-router-dom'
import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import DescItem from '../../components/DescItem'

const { Title } = Typography

const columnsTrx = [
  {
    title: 'Transaction ID',
    dataIndex: 'hash',
    key: 'hash',
    render(record) {
      return <Link to="/">{record}</Link>
    },
  },
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Sender',
    dataIndex: 'sender',
    key: 'sender',
  },
  {
    title: 'Recipient',
    dataIndex: 'recipient',
    key: 'recipient',
  },
  {
    title: 'Confirmation',
    dataIndex: 'confirmation',
    key: 'confirmation',
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

const columnsNode = [
  {
    title: 'Node ID',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: 'Status',
    dataIndex: 'coins',
    key: 'coins',
  },
]

const Account = () => {
  return (
    <DefaultLayout>
      <Container fluid>
        <Row gutter={8}>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <Title level={4}>Account #123456</Title>
              </Col>
            </Row>
            <Card className="card-summary">
              <Title level={4}>Summary</Title>
              <DescItem label="Balance" value="200" />
              <DescItem label="Pending Transactions" value="20" />
              <DescItem label="Multisign Info" value="Bla bla bla" />
              <DescItem label="Total Fee Paid" value="20" />
              <DescItem label="Known Since" value="12-Jul-2017 12:00:00" />
              <DescItem label="Last Active" value="1 week ago" />
            </Card>
            <Card className="card-summary">
              <Title level={4}>
                Node Info <Badge className="badge-black" count={425} overflowCount={1000} />
              </Title>
              <Table columns={columnsNode} dataSource={[]} pagination={false} size="small" />
              <Pagination className="pagination-center" current={5} total={100} />
            </Card>
            <Card>
              <Title level={4}>
                Transactions <Badge className="badge-black" count={425} overflowCount={1000} />
              </Title>
              <Table columns={columnsTrx} dataSource={[]} pagination={false} size="small" />
              <Pagination className="pagination-center" current={5} total={100} />
            </Card>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  )
}

export default Account
