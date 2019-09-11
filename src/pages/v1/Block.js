import React from 'react'
import { Row, Col, Card, Typography, Table, Pagination, Badge } from 'antd'
import { Link } from 'react-router-dom'
import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import DescItem from '../../components/DescItem'
import CopyToClipboard from '../../components/CopyToClipboard'

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

const columnsReward = [
  {
    title: 'Account',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: 'Coins',
    dataIndex: 'coins',
    key: 'coins',
  },
]

const columnsReceipt = [
  {
    title: 'Sender Public Key',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: 'Reciever Public Key',
    dataIndex: 'coins',
    key: 'coins',
  },
  {
    title: 'Block Height',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: 'Block ID',
    dataIndex: 'coins',
    key: 'coins',
  },
  {
    title: 'Data Type',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: 'Data Hash',
    dataIndex: 'coins',
    key: 'coins',
  },
  {
    title: 'Receipt Merkle Root',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: 'Reciever Signature',
    dataIndex: 'coins',
    key: 'coins',
  },
]

const Block = () => {
  return (
    <DefaultLayout>
      <Container fluid>
        <Row gutter={8}>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <Title level={4}>Block #123456</Title>
              </Col>
            </Row>
            <Card className="card-summary">
              <DescItem label="Height" value={<CopyToClipboard text="23456" />} />
            </Card>
            <Card className="card-summary">
              <Title level={4}>Summary</Title>
              <DescItem label="Timestamp" value="16-Jul-2019 03:31:19" />
              <DescItem
                label="Previous Block ID"
                value={
                  <CopyToClipboard text="00000000000000000015933029dca9ac633e2b2324bd88f2eee77ab7269fbf02" />
                }
              />
              <DescItem
                label="Block Seed"
                value={
                  <CopyToClipboard text="00000000000000000015933029dca9ac633e2b2324bd88f2eee77ab7269fbf02" />
                }
              />
              <DescItem
                label="Block Signature"
                value={
                  <CopyToClipboard text="00000000000000000015933029dca9ac633e2b2324bd88f2eee77ab7269fbf02" />
                }
              />
              <DescItem label="Cumulative Difficulty" value="2464923742379" />
              <DescItem label="Smith Scale" value="7611456" />
              <DescItem
                label="Blocksmith Address"
                value="BCZ15933029dca9ac633e2b2324bd88f2eee77ab7269fbf02"
              />
              <DescItem label="Total Amount" value="0" />
              <DescItem label="Total Fee" value="0" />
              <DescItem label="Total Rewards" value="0" />
              <DescItem label="Version" value="1" />
              <DescItem label="Total Receipts" value="1" />
              <DescItem label="Receipt Value" value="1" />
              <DescItem label="Blocksmith ID" value="1" />
              <DescItem label="PoP Change" value="1" />
              <DescItem label="Payload Length" value="0" />
              <DescItem label="Payload Hash" />
            </Card>
            <Card className="card-summary">
              <Title level={4}>
                Rewards / Coinbase{' '}
                <Badge className="badge-black" count={425} overflowCount={1000} />
              </Title>
              <Table columns={columnsReward} dataSource={[]} pagination={false} size="small" />
              <Pagination className="pagination-center" current={5} total={100} />
            </Card>
            <Card className="card-summary">
              <Title level={4}>
                Reciepts <Badge className="badge-black" count={425} overflowCount={1000} />
              </Title>
              <Table columns={columnsReceipt} dataSource={[]} pagination={false} size="small" />
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

export default Block
