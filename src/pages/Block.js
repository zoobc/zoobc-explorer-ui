/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery, gql, useLazyQuery } from '@apollo/client'
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
  accountRewardColumns,
  popColumns,
} from '../config/table-columns'

const GET_BLOCK_DATA = gql`
  query getBlock($BlockID: String!) {
    block(BlockID: $BlockID) {
      Height
      BlockID
      BlockHash
      BlockHashFormatted
      Timestamp
      PreviousBlockID
      PreviousBlockIDFormatted
      BlockSeed
      BlockSignature
      CumulativeDifficulty
      SmithScale
      BlocksmithAddress
      BlocksmithAddressFormatted
      TotalAmountConversion
      TotalFeeConversion
      TotalRewardsConversion
      TotalCoinBaseConversion
      Version
      TotalReceipts
      ReceiptValue
      BlocksmithID
      BlocksmithIDFormatted
      PopChange
      PayloadLength
      PayloadHash
      SkippedBlocksmiths {
        BlocksmithPublicKey
        BlocksmithPublicKeyFormatted
        POPChange
        BlockHeight
        BlocksmithIndex
      }
      PublishedReceipts {
        Receipt {
          SenderPublicKey
          SenderPublicKeyFormatted
          RecipientPublicKey
          RecipientPublicKeyFormatted
          DatumType
          DatumHash
          RecipientSignature
        }
        BlockHeight
      }
      PopChanges {
        NodeID
        NodePublicKey
        NodePublicKeyFormatted
        Score
        Latest
        Height
        DifferenceScores
        DifferenceScorePercentage
        Flag
      }
      AccountRewards {
        AccountAddress
        BlockHeight
        Timestamp
        EventType
        BalanceChangeConversion
      }
    }
  }
`

const GET_TRX_BY_BLOCK = gql`
  query getTrxByBlock($page: Int, $BlockID: String) {
    transactions(page: $page, limit: 5, order: "-Height", BlockID: $BlockID) {
      Transactions {
        TransactionID
        TransactionHashFormatted
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
          TransactionHashFormatted
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
          TransactionHashFormatted
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

const { Panel } = Collapse

const Block = ({ match }) => {
  const { params } = match
  const { t } = useTranslation()
  const [trxCurrentPage, setTrxCurrentPage] = useState(1)
  const [transactions, setTransactions] = useState([])
  const [trxPaginate, setTrxPaginate] = useState({})

  const { loading, data, error } = useQuery(GET_BLOCK_DATA, {
    variables: {
      BlockID: params.id,
    },
    onCompleted(data) {
      if (!!data) {
        fetcTrxByBlock({
          variables: {
            BlockID: data.block.BlockID,
          },
        })
      }
    },
  })

  const [fetcTrxByBlock, trxByBlock] = useLazyQuery(GET_TRX_BY_BLOCK, {
    variables: {
      BlockID: params.id,
      page: trxCurrentPage,
    },
  })

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

  return (
    <>
      {!!error && <NotFound />}
      {!!loading && <LoaderPage />}
      {!!data &&
        (data.block.Height ? (
          <Container>
            <Row className="block-row">
              <Col span={24}>
                <Row>
                  <Col span={24}>
                    <h4 className="truncate page-title">
                      {t('block')} {data.block.Height}
                    </h4>
                  </Col>
                </Row>
                <Card className="block-card" bordered={false}>
                  <DescItem
                    label={t('height')}
                    text={t(
                      'the position of the block in the zoobc blockchain. for example, height 0, would be the very first block, which is also called the genesis block'
                    )}
                    value={data.block.Height}
                  />
                  <DescItem
                    label={t('block hash')}
                    style={{ display: 'none' }}
                    value={<CopyToClipboard text={data.block.BlockHashFormatted} keyID="blockID" />}
                    textClassName="monospace-text"
                  />
                </Card>
                <Card className="block-card" bordered={false}>
                  <h4 className="block-card-title page-title">{t('summary')}</h4>
                  <DescItem
                    label={t('block id')}
                    text={t(
                      'an identifier which facilitates easy identification of blocks on the zoobc blockchain'
                    )}
                    value={<CopyToClipboard text={data.block.BlockID} keyID="blockID" />}
                  />
                  <DescItem
                    label={t('timestamp')}
                    style={{ display: 'none' }}
                    value={moment(data.block.Timestamp).format('lll')}
                  />
                  <DescItem
                    label={t('previous block hash')}
                    style={{ display: 'none' }}
                    value={data.block.PreviousBlockIDFormatted}
                    textClassName="monospace-text"
                  />
                  <DescItem
                    label={t('block seed')}
                    text={t('a seed for random number uniquely generated for the block')}
                    value={data.block.BlockSeed}
                    textClassName="monospace-text"
                  />
                  <DescItem
                    label={t('block signature')}
                    style={{ display: 'none' }}
                    value={data.block.BlockSignature}
                    textClassName="monospace-text"
                  />
                  <DescItem
                    label={t('cumulative difficulty')}
                    text={t('difficulty of the blockchain up to this current block')}
                    value={data.block.CumulativeDifficulty}
                  />
                  {/* <DescItem label={t('smith scale')} value={data.block.SmithScale} /> */}
                  {/* <DescItem
                    label={t('blocksmith address')}
                    text={t('account that generated the block')}
                    value={
                      <Link to={`/accounts/${data.block.BlocksmithAddress}`}>
                        {data.block.BlocksmithAddress}
                      </Link>
                    }
                  /> */}
                  <DescItem
                    label={t('total amount')}
                    style={{ display: 'none' }}
                    value={data.block.TotalAmountConversion}
                  />
                  <DescItem
                    label={t('total fee')}
                    style={{ display: 'none' }}
                    value={
                      <NumberFormat
                        value={data.block.TotalFeeConversion}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' ZBC'}
                        className="monospace-text"
                      />
                    }
                  />
                  <DescItem
                    label={t('total coinbase')}
                    style={{ display: 'none' }}
                    value={
                      <NumberFormat
                        value={data.block.TotalCoinBaseConversion}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' ZBC'}
                        className="monospace-text"
                      />
                    }
                  />
                  <DescItem
                    label={t('total rewards')}
                    text={t('total coinbase + total fee')}
                    value={
                      <NumberFormat
                        value={data.block.TotalRewardsConversion}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' ZBC'}
                        className="monospace-text"
                      />
                    }
                  />
                  <DescItem
                    label={t('version')}
                    style={{ display: 'none' }}
                    value={data.block.Version}
                  />
                  {/* <DescItem
                    label={t('total receipts')}
                    style={{ display: 'none' }}
                    value={data.block.TotalReceipts}
                  />
                  <DescItem
                    label={t('receipt value')}
                    style={{ display: 'none' }}
                    value={data.block.ReceiptValue}
                  /> */}
                  <DescItem
                    label={t('blocksmith public key')}
                    style={{ display: 'none' }}
                    value={
                      <Link to={`/nodes/${data.block.BlocksmithIDFormatted}`}>
                        {data.block.BlocksmithIDFormatted}
                      </Link>
                    }
                    textClassName="monospace-text"
                  />
                  {/* <DescItem
                    label={t('pop change')}
                    style={{ display: 'none' }}
                    value={data.block.PopChange}
                  /> */}
                  <DescItem
                    label={t('payload length')}
                    style={{ display: 'none' }}
                    value={data.block.PayloadLength}
                  />
                  <DescItem
                    label={t('payload hash')}
                    style={{ display: 'none' }}
                    value={data.block.PayloadHash}
                    textClassName="monospace-text"
                  />
                </Card>
                <Collapse className="block-collapse" bordered={false}>
                  <Panel
                    className="block-card-title block-collapse"
                    header={t('pop changes')}
                    key="1"
                  >
                    <Card className="block-card" bordered={false}>
                      <h4 className="block-card-title page-title">{t('pop changes')}</h4>
                      <Table
                        className="transactions-table"
                        columns={popColumns}
                        dataSource={data.block.PopChanges || []}
                        pagination={{
                          pageSize: 5,
                        }}
                        size="small"
                      />
                    </Card>
                  </Panel>
                </Collapse>
                <Collapse className="block-collapse" bordered={false}>
                  <Panel
                    className="block-card-title block-collapse"
                    header={t('skipped blocksmith')}
                    key="1"
                  >
                    <Card className="block-card" bordered={false}>
                      <h4 className="block-card-title page-title">{t('skipped blocksmith')}</h4>
                      <Table
                        className="transactions-table"
                        columns={skippedBlocksmithColumns}
                        dataSource={data.block.SkippedBlocksmiths || []}
                        pagination={{
                          pageSize: 5,
                        }}
                        size="small"
                      />
                    </Card>
                  </Panel>
                </Collapse>
                <Collapse className="block-collapse" bordered={false}>
                  <Panel
                    className="block-card-title block-collapse"
                    header={t('account rewards')}
                    key="2"
                  >
                    <Card className="block-card" bordered={false}>
                      <h4 className="block-card-title page-title">
                        {t('account rewards')}
                        <Badge className="badge-black" count={0} overflowCount={1000} />
                      </h4>
                      <Table
                        className="transactions-table"
                        columns={accountRewardColumns}
                        dataSource={data.block.AccountRewards || []}
                        pagination={{
                          pageSize: 5,
                        }}
                        size="small"
                      />
                    </Card>
                  </Panel>
                </Collapse>
                <Collapse className="block-collapse" bordered={false}>
                  <Panel
                    className="block-card-title block-collapse"
                    header={t('published receipts')}
                    key="3"
                  >
                    <Card className="block-card" bordered={false}>
                      <h4 className="block-card-title page-title">
                        {t('published receipts')}
                        <Badge
                          className="badge-black"
                          count={data.block.TotalReceipts}
                          overflowCount={1000}
                        />
                      </h4>
                      <Table
                        columns={publishedReceiptColumns}
                        dataSource={data.block.PublishedReceipts || []}
                        pagination={{
                          pageSize: 5,
                        }}
                        size="small"
                        loading={loading}
                      />
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
                      <h4 className="block-card-title page-title">
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
                        scroll={{ x: 1500 }}
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
        ) : (
          <NotFound />
        ))}
    </>
  )
}

export default Block
