import React from 'react'
import { Row, Col, Card, Typography, Table, Pagination, Badge } from 'antd'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'

import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import DescItem from '../../components/DescItem'
import CopyToClipboard from '../../components/CopyToClipboard'
import NotFound from '../../components/Errors/NotFound'
import LoaderPage from '../../components/Loader/LoaderPage'

const { Title } = Typography

const GET_BLOCK_DATA = gql`
  query getBlock($BlockID: String!) {
    block(BlockID: $BlockID) {
      Height
      Timestamp
      PreviousBlockID
      BlockSeed
      BlockSignature
      CumulativeDifficulty
      SmithScale
      BlocksmithAddress
      TotalAmount
      TotalFee
      TotalRewards
      Version
      TotalReceipts
      ReceiptValue
      BlocksmithID
      PopChange
      PayloadLength
      PayloadHash
    }
  }
`

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

const Block = ({ match }) => {
  const { params } = match
  const { loading, data, error } = useQuery(GET_BLOCK_DATA, {
    variables: {
      BlockID: params.id,
    },
  })

  return (
    <DefaultLayout>
      {!!error && <NotFound />}
      {!!loading && <LoaderPage />}
      {!error && !loading && (
        <Container fluid>
          <Row gutter={8}>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <Title level={4}>Block #{data.block.Height}</Title>
                </Col>
              </Row>
              <Card className="card-summary">
                <DescItem label="Height" value={data.block.Height} />
              </Card>
              <Card className="card-summary">
                <Title level={4}>Summary</Title>
                <DescItem label="Timestamp" value={moment(data.block.Timestamp).format('lll')} />
                <DescItem
                  label="Previous Block ID"
                  value={<CopyToClipboard text={data.block.PreviousBlockID} keyID="preBlockID" />}
                />
                <DescItem label="Block Seed" value={data.block.BlockSeed} />
                <DescItem label="Block Signature" value={data.block.BlockSignature} />
                <DescItem label="Cumulative Difficulty" value={data.block.CumulativeDifficulty} />
                <DescItem label="Smith Scale" value={data.block.SmithScale} />
                <DescItem label="Blocksmith Address" value={data.block.BlocksmithAddress} />
                <DescItem label="Total Amount" value={data.block.TotalAmount} />
                <DescItem label="Total Fee" value={data.block.TotalFee} />
                <DescItem label="Total Rewards" value={data.block.TotalRewards} />
                <DescItem label="Version" value={data.block.Version} />
                <DescItem label="Total Receipts" value={data.block.TotalReceipts} />
                <DescItem label="Receipt Value" value={data.block.ReceiptValue} />
                <DescItem label="Blocksmith ID" value={data.block.BlocksmithID} />
                <DescItem label="PoP Change" value={data.block.PopChange} />
                <DescItem label="Payload Length" value={data.block.PayloadLength} />
                <DescItem label="Payload Hash" value={data.block.PayloadHash} />
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
      )}
    </DefaultLayout>
  )
}

export default Block
