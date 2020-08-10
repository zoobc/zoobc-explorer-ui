/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery, gql } from '@apollo/client'
import { Row, Col, Card, Table, Pagination, Collapse, Badge } from 'antd'

import Container from '../components/Container'
import DescItem from '../components/DescItem'
import CopyToClipboard from '../components/CopyToClipboard'
import NotFound from '../components/Errors/NotFound'
import LoaderPage from '../components/LoaderPage'
import {
  transactionColumns,
  publishedReceiptColumns,
  skippedBlocksmithColumns,
} from '../config/table-columns'

const GET_BLOCK_DATA = gql`
  query getBlock($BlockID: String!) {
    block(BlockID: $BlockID) {
      Height
      BlockID
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
      SkippedBlocksmiths {
        BlocksmithPublicKey
        POPChange
        BlockHeight
        BlocksmithIndex
      }
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
        TransactionType
        Sender
        Recipient
        Fee
        BlockID
        FeeConversion
        TransactionHash
        MultisigChild
        Status
        SendMoney {
          AmountConversion
        }
        NodeRegistration {
          LockedBalanceConversion
        }
        UpdateNodeRegistration {
          LockedBalanceConversion
        }
        Escrow {
          SenderAddress
        }
        MultiSignatureTransactions {
          TransactionID
          BlockID
          Height
          Timestamp
          TransactionTypeName
          Sender
          Recipient
          FeeConversion
          Status
        }
        EscrowTransaction {
          TransactionID
          TransactionHash
          Timestamp
          TransactionType
          TransactionTypeName
          BlockID
          Height
          Sender
          Recipient
          FeeConversion
          Status
        }
      }
      Paginate {
        Page
        Count
        Total
      }
    }
  }
`

// const GET_RECEIPT_BY_BLOCK = gql`
//   query getReceiptByBlock($page: Int, $BlockHeight: Int) {
//     publishedReceipts(page: $page, limit: 5, order: "-BlockHeight", BlockHeight: $BlockHeight) {
//       PublishedReceipts {
//         BatchReceipt {
//           Height
//           SenderPublicKey
//           ReceiverPublicKey
//           DataType
//           DataHash
//           ReceiptMerkleRoot
//           ReceiverSignature
//           ReferenceBlockHash
//         }
//         IntermediateHashes
//         BlockHeight
//         ReceiptIndex
//         PublishedIndex
//       }
//       Paginate {
//         Page
//         Count
//         Total
//       }
//     }
//   }
// `

const { Panel } = Collapse

const Block = ({ match }) => {
  const { params } = match
  const { t } = useTranslation()
  const [trxCurrentPage, setTrxCurrentPage] = useState(1)
  const [transactions, setTransactions] = useState([])
  const [trxPaginate, setTrxPaginate] = useState({})

  const [receiptCurrntPage, setReceiptCurrentPage] = useState(1)
  // const [receiptCurrentPage, setReceiptCurrentPage] = useState(1)
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

  // const receiptByBlock = useQuery(GET_RECEIPT_BY_BLOCK, {
  //   variables: {
  //     BlockHeight: blockHeight,
  //     page: receiptCurrentPage,
  //   },
  // })

  useEffect(() => {
    if (!!trxByBlock.data) {
      const trxData = trxByBlock.data.transactions.Transactions.map((trx, key) => {
        const { SendMoney, NodeRegistration, UpdateNodeRegistration } = trx
        return {
          key,
          ...trx,
          Amount: SendMoney
            ? SendMoney.AmountConversion
            : NodeRegistration
            ? NodeRegistration.LockedBalanceConversion
            : UpdateNodeRegistration
            ? UpdateNodeRegistration.LockedBalanceConversion
            : '0',
          children:
            (trx.MultisigChild ? [...trx.MultiSignatureTransactions] : null) ||
            (trx.EscrowTransaction ? [trx.EscrowTransaction] : null),
        }
      })

      setTransactions(trxData)
      setTrxPaginate(trxByBlock.data.transactions.Paginate)
    }
  }, [trxByBlock.data])

  // useEffect(() => {
  //   if (!!receiptByBlock.data) {
  //     const receiptData = receiptByBlock.data.publishedReceipts.PublishedReceipts.map(
  //       (receipt, key) => {
  //         return {
  //           key,
  //           ...receipt,
  //         }
  //       }
  //     )

  //     setReceipts(receiptData)
  //     setReceiptPaginate(receiptByBlock.data.publishedReceipts.Paginate)
  //   }
  // }, [receiptByBlock.data])

  useEffect(() => {
    if (!!data) {
      setBlockHeight(data.block.Height)
    }
  }, [data])

  return (
    <>
      {!!error && <NotFound />}
      {!!loading && <LoaderPage />}
      {!error && !loading && (
        <Container>
          <Row className="block-row">
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <h4 className="truncate">
                    {t('block')} {data.block.Height}
                  </h4>
                </Col>
              </Row>
              <Card className="block-card" bordered={false}>
                <DescItem label={t('height')} value={data.block.Height} />
              </Card>
              <Card className="block-card" bordered={false}>
                <h4 className="block-card-title">{t('summary')}</h4>
                <DescItem
                  label={t('block id')}
                  value={<CopyToClipboard text={data.block.BlockID} keyID="blockID" />}
                />
                <DescItem
                  label={t('timestamp')}
                  value={moment(data.block.Timestamp).format('lll')}
                />
                <DescItem label={t('previous block id')} value={data.block.PreviousBlockID} />
                <DescItem label={t('block seed')} value={data.block.BlockSeed} />
                <DescItem label={t('block signature')} value={data.block.BlockSignature} />
                <DescItem
                  label={t('cumulative difficulty')}
                  value={data.block.CumulativeDifficulty}
                />
                {/* <DescItem label={t('smith scale')} value={data.block.SmithScale} /> */}
                <DescItem
                  label={t('blocksmith address')}
                  value={
                    <Link to={`/accounts/${data.block.BlocksmithAddress}`}>
                      {data.block.BlocksmithAddress}
                    </Link>
                  }
                />
                <DescItem label={t('total amount')} value={data.block.TotalAmountConversion} />
                <DescItem
                  label={t('total fee')}
                  value={
                    <NumberFormat
                      value={data.block.TotalFeeConversion}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' ZBC'}
                    />
                  }
                />
                <DescItem
                  label={t('total rewards')}
                  value={
                    <NumberFormat
                      value={data.block.TotalRewardsConversion}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' ZBC'}
                    />
                  }
                />
                <DescItem label={t('version')} value={data.block.Version} />
                <DescItem label={t('total receipts')} value={data.block.TotalReceipts} />
                <DescItem label={t('receipt value')} value={data.block.ReceiptValue} />
                <DescItem
                  label={t('blocksmith id')}
                  value={
                    <Link to={`/nodes/${data.block.BlocksmithID}`}>{data.block.BlocksmithID}</Link>
                  }
                />
                <DescItem label={t('pop change')} value={data.block.PopChange} />
                <DescItem label={t('payload length')} value={data.block.PayloadLength} />
                <DescItem label={t('payload hash')} value={data.block.PayloadHash} />
              </Card>
              <Collapse className="block-collapse" bordered={false}>
                <Panel
                  className="block-card-title block-collapse"
                  header={t('pop changes')}
                  key="1"
                >
                  <Card className="block-card" bordered={false}>
                    <h4 className="block-card-title">{t('pop changes')}</h4>
                    <Table
                      className="transactions-table"
                      columns={skippedBlocksmithColumns}
                      dataSource={data.block.SkippedBlocksmiths}
                      pagination={false}
                      size="small"
                    />
                  </Card>
                </Panel>
              </Collapse>
              <Collapse className="block-collapse" bordered={false}>
                <Panel className="block-card-title block-collapse" header={t('rewards')} key="2">
                  <Card className="block-card" bordered={false}>
                    <h4 className="block-card-title">
                      {t('coinbase')}
                      <Badge className="badge-black" count={0} overflowCount={1000} />
                    </h4>
                    <Table
                      className="transactions-table"
                      columns={transactionColumns}
                      dataSource={[]}
                      pagination={false}
                      size="small"
                    />
                    <Pagination className="pagination-center" current={5} total={100} />
                  </Card>
                </Panel>
              </Collapse>
              <Collapse className="block-collapse" bordered={false}>
                <Panel className="block-card-title block-collapse" header={t('receipts')} key="3">
                  <Card className="block-card" bordered={false}>
                    <h4 className="block-card-title">
                      {t('receipts')}
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
              </Collapse>
              <Collapse className="block-collapse" defaultActiveKey={['4']} bordered={false}>
                <Panel
                  className="block-card-title block-collapse"
                  header={t('transactions')}
                  key="4"
                >
                  <Card className="block-card" bordered={false}>
                    <h4 className="block-card-title">
                      {t('transactions')}
                      <Badge
                        className="badge-black"
                        count={trxPaginate.Total}
                        overflowCount={1000}
                      />
                    </h4>
                    <Table
                      className="transactions-table"
                      columns={transactionColumns}
                      dataSource={transactions}
                      pagination={false}
                      size="small"
                      loading={loading}
                      scroll={{ x: 1300 }}
                      rowKey="TransactionID"
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
    </>
  )
}

export default Block
