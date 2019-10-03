import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Typography, Table, Pagination, Badge } from 'antd'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import NumberFormat from 'react-number-format'

import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import DescItem from '../../components/DescItem'
import CopyToClipboard from '../../components/CopyToClipboard'
import NotFound from '../../components/Errors/NotFound'
import LoaderPage from '../../components/Loader/LoaderPage'
import { transactionColumns, blockReceiptColumns } from '../../config/table-columns'

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
      TotalAmountConversion
      TotalFeeConversion
      TotalRewardsConversion
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

const GET_TRX_BY_BLOCK = gql`
  query getTrxByBlock($page: Int, $BlockID: String) {
    transactions(page: $page, limit: 5, order: "-Height", BlockID: $BlockID) {
      Transactions {
        TransactionID
        Height
        Timestamp
        TransactionType
        Sender
        Recipient
        Confirmations
        Fee
        BlockID
      }
      Paginate {
        Page
        Count
        Total
      }
    }
  }
`

const GET_RECEIPT_BY_BLOCK = gql`
  query getReceiptByBlock($page: Int, $BlockID: String) {
    blockReceipts(page: $page, limit: 5, order: "-Height", BlockID: $BlockID) {
      BlockReceipts {
        BlockID
        Height
        SenderPublicKey
        ReceiverPublicKey
        DataType
        DataHash
        ReceiptMerkleRoot
        ReceiverSignature
        ReferenceBlockHash
      }
      Paginate {
        Page
        Count
        Total
      }
    }
  }
`

const Block = ({ match }) => {
  const { params } = match
  const [trxCurrentPage, setTrxCurrentPage] = useState(1)
  const [transactions, setTransactions] = useState([])
  const [trxPaginate, setTrxPaginate] = useState({})

  const [receiptCurrentPage, setReceiptCurrentPage] = useState(1)
  const [receipts, setReceipts] = useState([])
  const [receiptPaginate, setReceiptPaginate] = useState({})

  const { loading, data, error } = useQuery(GET_BLOCK_DATA, {
    variables: {
      BlockID: params.id,
    },
  })

  const trxByBlock = useQuery(GET_TRX_BY_BLOCK, {
    variables: {
      BlockID: params.id,
      page: trxCurrentPage,
    },
  })

  const receiptByBlock = useQuery(GET_RECEIPT_BY_BLOCK, {
    variables: {
      BlockID: params.id,
      page: receiptCurrentPage,
    },
  })

  useEffect(() => {
    if (!!trxByBlock.data) {
      const trxData = trxByBlock.data.transactions.Transactions.map((trx, key) => {
        return {
          key,
          ...trx,
        }
      })

      setTransactions(trxData)
      setTrxPaginate(trxByBlock.data.transactions.Paginate)
    }
  }, [trxByBlock.data])

  useEffect(() => {
    if (!!receiptByBlock.data) {
      const receiptData = receiptByBlock.data.blockReceipts.BlockReceipts.map((receipt, key) => {
        return {
          key,
          ...receipt,
        }
      })

      setReceipts(receiptData)
      setReceiptPaginate(receiptByBlock.data.blockReceipts.Paginate)
    }
  }, [receiptByBlock.data])

  return (
    <DefaultLayout>
      {!!error && <NotFound />}
      {!!loading && <LoaderPage />}
      {!error && !loading && (
        <Container>
          <Row gutter={8}>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <Title level={4}>Block {data.block.Height}</Title>
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
                <DescItem label="Total Amount" value={data.block.TotalAmountConversion} />
                <DescItem
                  label="Total Fee"
                  value={
                    <NumberFormat
                      value={data.block.TotalFeeConversion}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' BCZ'}
                    />
                  }
                />
                <DescItem
                  label="Total Rewards"
                  value={
                    <NumberFormat
                      value={data.block.TotalRewardsConversion}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' BCZ'}
                    />
                  }
                />
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
                  Transactions{' '}
                  <Badge className="badge-black" count={trxPaginate.Total} overflowCount={1000} />
                </Title>
                <Table
                  columns={transactionColumns}
                  dataSource={transactions}
                  pagination={false}
                  size="small"
                  loading={loading}
                />
                {!!data && (
                  <Pagination
                    className="pagination-center"
                    current={trxPaginate.Page}
                    total={trxPaginate.Total}
                    pageSize={5}
                    onChange={page => setTrxCurrentPage(page)}
                  />
                )}
              </Card>
              <Card className="card-summary">
                <Title level={4}>
                  Rewards / Coinbase{' '}
                  <Badge className="badge-black" count={425} overflowCount={1000} />
                </Title>
                <Table
                  columns={transactionColumns}
                  dataSource={[]}
                  pagination={false}
                  size="small"
                />
                <Pagination className="pagination-center" current={5} total={100} />
              </Card>
              <Card className="card-summary">
                <Title level={4}>
                  Receipts{' '}
                  <Badge
                    className="badge-black"
                    count={receiptPaginate.Total}
                    overflowCount={1000}
                  />
                </Title>
                <Table
                  columns={blockReceiptColumns}
                  dataSource={receipts}
                  pagination={false}
                  size="small"
                  loading={loading}
                />
                {!!data && (
                  <Pagination
                    className="pagination-center"
                    current={receiptPaginate.Page}
                    total={receiptPaginate.Total}
                    pageSize={5}
                    onChange={page => setReceiptCurrentPage(page)}
                  />
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </DefaultLayout>
  )
}

export default Block
