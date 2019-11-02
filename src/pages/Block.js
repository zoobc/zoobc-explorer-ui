import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Table, Pagination, Badge, Collapse } from 'antd'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import { useTranslation } from 'react-i18next'

import DefaultLayout from '../components/DefaultLayout'
import Container from '../components/Container'
import DescItem from '../components/DescItem'
import CopyToClipboard from '../components/CopyToClipboard'
import NotFound from '../components/Errors/NotFound'
import LoaderPage from '../components/LoaderPage'
import { transactionColumns, publishedReceiptColumns } from '../config/table-columns'

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
        TransactionTypeName
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
  query getReceiptByBlock($page: Int, $BlockHeight: Int) {
    publishedReceipts(page: $page, limit: 5, order: "-BlockHeight", BlockHeight: $BlockHeight) {
      PublishedReceipts {
        BatchReceipt {
          Height
          SenderPublicKey
          ReceiverPublicKey
          DataType
          DataHash
          ReceiptMerkleRoot
          ReceiverSignature
          ReferenceBlockHash
        }
        IntermediateHashes
        BlockHeight
        ReceiptIndex
        PublishedIndex
      }
      Paginate {
        Page
        Count
        Total
      }
    }
  }
`

const { Panel } = Collapse

const Block = ({ match }) => {
  const { params } = match
  const { t } = useTranslation()
  const [trxCurrentPage, setTrxCurrentPage] = useState(1)
  const [transactions, setTransactions] = useState([])
  const [trxPaginate, setTrxPaginate] = useState({})

  const [receiptCurrentPage, setReceiptCurrentPage] = useState(1)
  const [receipts, setReceipts] = useState([])
  const [receiptPaginate, setReceiptPaginate] = useState({})

  const [blockHeight, setBlockHeight] = useState(null)

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
      BlockHeight: blockHeight,
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
      const receiptData = receiptByBlock.data.publishedReceipts.PublishedReceipts.map(
        (receipt, key) => {
          return {
            key,
            ...receipt,
          }
        }
      )

      setReceipts(receiptData)
      setReceiptPaginate(receiptByBlock.data.publishedReceipts.Paginate)
    }
  }, [receiptByBlock.data])

  useEffect(() => {
    if (!!data) {
      setBlockHeight(data.block.Height)
    }
  }, [data])

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
                  <h4>
                    {t('Block')} {data.block.Height}
                  </h4>
                </Col>
              </Row>
              <Card className="card-summary" bordered={false}>
                <DescItem label="Height" value={data.block.Height} />
              </Card>
              <Card className="card-summary" bordered={false}>
                <h4>{t('Summary')}</h4>
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
              <Collapse defaultActiveKey={['3']}>
                <Panel header="Rewards" key="1">
                  <Card className="card-summary" bordered={false}>
                    <h4>
                      Rewards / Coinbase{' '}
                      <Badge className="badge-black" count={425} overflowCount={1000} />
                    </h4>
                    <Table
                      columns={transactionColumns}
                      dataSource={[]}
                      pagination={false}
                      size="small"
                    />
                    <Pagination className="pagination-center" current={5} total={100} />
                  </Card>
                </Panel>
                <Panel header="Receipts" key="2">
                  <Card className="card-summary" bordered={false}>
                    <h4>
                      Receipts
                      <Badge
                        className="badge-black"
                        count={receiptPaginate.Total}
                        overflowCount={1000}
                      />
                    </h4>
                    <Table
                      columns={publishedReceiptColumns}
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
                </Panel>
                <Panel header="Transactions" key="3">
                  <Card className="card-summary" bordered={false}>
                    <h4>
                      {t('Transactions')}
                      <Badge
                        className="badge-black"
                        count={trxPaginate.Total}
                        overflowCount={1000}
                      />
                    </h4>
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
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </Container>
      )}
    </DefaultLayout>
  )
}

export default Block
