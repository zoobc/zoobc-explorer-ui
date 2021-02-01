/**
 * ZooBC Copyright (C) 2020 Quasisoft Limited - Hong Kong
 * This file is part of ZooBC <https://github.com/zoobc/zoobc-explorer-ui>

 * ZooBC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * ZooBC is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with ZooBC.  If not, see <http://www.gnu.org/licenses/>.

 * Additional Permission Under GNU GPL Version 3 section 7.
 * As the special exception permitted under Section 7b, c and e,
 * in respect with the Author’s copyright, please refer to this section:

 * 1. You are free to convey this Program according to GNU GPL Version 3,
 *     as long as you respect and comply with the Author’s copyright by
 *     showing in its user interface an Appropriate Notice that the derivate
 *     program and its source code are “powered by ZooBC”.
 *     This is an acknowledgement for the copyright holder, ZooBC,
 *     as the implementation of appreciation of the exclusive right of the
 *     creator and to avoid any circumvention on the rights under trademark
 *     law for use of some trade names, trademarks, or service marks.

 * 2. Complying to the GNU GPL Version 3, you may distribute
 *     the program without any permission from the Author.
 *     However a prior notification to the authors will be appreciated.

 * ZooBC is architected by Roberto Capodieci & Barton Johnston
 * contact us at roberto.capodieci[at]blockchainzoo.com
 * and barton.johnston[at]blockchainzoo.com

 * IMPORTANT: The above copyright notice and this permission notice
 * shall be included in all copies or substantial portions of the Software.
**/

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery, gql, useLazyQuery } from '@apollo/client'
import { Row, Col, Card, Table, Pagination, Collapse, Badge, Button, Avatar } from 'antd'

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
import { NextPreviousBlock } from '../components/'

const GET_BLOCK_DATA = gql`
  query getBlock($BlockID: String!) {
    block(BlockID: $BlockID) {
      Block {
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
          AccountAddressFormatted
          BlockHeight
          Timestamp
          EventType
          BalanceChangeConversion
        }
      }
      NextPrevious {
        Previous {
          Enabled
          Height
          BlockHashFormatted
        }
        Next {
          Enabled
          Height
          BlockHashFormatted
        }
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
        SenderFormatted
        Recipient
        RecipientFormatted
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
  const { t } = useTranslation()
  const { params } = match
  const [trxCurrentPage, setTrxCurrentPage] = useState(1)
  const [transactions, setTransactions] = useState([])
  const [trxPaginate, setTrxPaginate] = useState({})
  const [label, setLabel] = useState('show more')

  const { loading, data, error } = useQuery(GET_BLOCK_DATA, {
    variables: {
      BlockID: params.id,
    },
    onCompleted(data) {
      if (!!data) {
        fetcTrxByBlock({
          variables: {
            BlockID: data.block.Block.BlockID,
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

  const onChange = val => {
    if (val && val.length > 0) setLabel('hide detail')
    else setLabel('show detail')
  }

  const onChangeHeight = height => {
    window.location.href = height
  }

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
        data.block &&
        (data.block.Block.Height ? (
          <Container>
            <Row className="block-row">
              <Col span={24}>
                <div className="wrap-title-and-blocks">
                  <div className="block-title">
                    {t('block')} {data.block.Block.Height}
                  </div>
                  <div className="next-previous-block">
                    <div className="previous-block">
                      {data &&
                        data.block &&
                        data.block.NextPrevious &&
                        data.block.NextPrevious.Previous && (
                          <NextPreviousBlock blocks={data.block.NextPrevious.Previous} />
                        )}
                    </div>
                    <div className="current-block">
                      <Avatar
                        size="large"
                        shape="square"
                        src={require('../assets/images/block-color.svg')}
                      />
                      <p>
                        <small>{data.block.Block.Height}</small>
                      </p>
                    </div>
                    <div className="next-block">
                      {data &&
                        data.block &&
                        data.block.NextPrevious &&
                        data.block.NextPrevious.Next && (
                          <NextPreviousBlock blocks={data.block.NextPrevious.Next} />
                        )}
                    </div>
                  </div>
                </div>
                <Card className="block-card" bordered={false}>
                  <h4 className="block-card-title page-title">{t('summary')}</h4>
                  <DescItem
                    label={t('height')}
                    text={t(
                      'the position of the block in the zoobc blockchain. for example, height 0, would be the very first block, which is also called the genesis block'
                    )}
                    value={data.block.Block.Height}
                  />
                  <DescItem
                    label={t('block hash')}
                    style={{ display: 'none' }}
                    value={
                      <CopyToClipboard text={data.block.Block.BlockHashFormatted} keyID="blockID" />
                    }
                    textClassName="monospace-text"
                  />
                  <DescItem
                    label={t('timestamp')}
                    style={{ display: 'none' }}
                    value={moment(data.block.Block.Timestamp).format('lll')}
                  />
                  <DescItem
                    label={t('total rewards')}
                    text={t('total coinbase + total fee')}
                    value={
                      <NumberFormat
                        value={data.block.Block.TotalRewardsConversion}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' ZBC'}
                        className="monospace-text"
                      />
                    }
                  />
                  <DescItem
                    label={t('Number of Transaction')}
                    style={{ display: 'none' }}
                    value={trxPaginate.Total}
                  />
                  <Collapse
                    bordered={false}
                    style={{ background: 'transparent', borderBottom: 0 }}
                    className="site-collapse-custom-collapse"
                    onChange={onChange}
                  >
                    <Panel showArrow={false} header={label} key="1" className="text-collapse">
                      <DescItem
                        label={t('previous block hash')}
                        style={{ display: 'none' }}
                        value={data.block.Block.PreviousBlockIDFormatted}
                        textClassName="monospace-text"
                      />
                      <DescItem
                        label={t('block seed')}
                        text={t('a seed for random number uniquely generated for the block')}
                        value={data.block.Block.BlockSeed}
                        textClassName="monospace-text"
                      />
                      <DescItem
                        label={t('block signature')}
                        style={{ display: 'none' }}
                        value={data.block.Block.BlockSignature}
                        textClassName="monospace-text"
                      />
                      <DescItem
                        label={t('cumulative difficulty')}
                        text={t('difficulty of the blockchain up to this current block')}
                        value={data.block.Block.CumulativeDifficulty}
                      />
                      <DescItem
                        label={t('total amount')}
                        style={{ display: 'none' }}
                        value={data.block.Block.TotalAmountConversion}
                      />
                      <DescItem
                        label={t('total fee')}
                        style={{ display: 'none' }}
                        value={
                          <NumberFormat
                            value={data.block.Block.TotalFeeConversion}
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
                            value={data.block.Block.TotalCoinBaseConversion}
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
                        value={data.block.Block.Version}
                      />
                      <DescItem
                        label={t('blocksmith public key')}
                        style={{ display: 'none' }}
                        value={
                          <Link to={`/nodes/${data.block.Block.BlocksmithIDFormatted}`}>
                            {data.block.Block.BlocksmithIDFormatted}
                          </Link>
                        }
                        textClassName="monospace-text"
                      />
                      <DescItem
                        label={t('payload length')}
                        style={{ display: 'none' }}
                        value={data.block.Block.PayloadLength}
                      />
                      <DescItem
                        label={t('payload hash')}
                        style={{ display: 'none' }}
                        value={data.block.Block.PayloadHash}
                        textClassName="monospace-text"
                      />
                    </Panel>
                  </Collapse>
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
                        dataSource={data.block.Block.PopChanges || []}
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
                        dataSource={data.block.Block.SkippedBlocksmiths || []}
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
                        dataSource={data.block.Block.AccountRewards || []}
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
                          count={data.block.Block.TotalReceipts}
                          overflowCount={1000}
                        />
                      </h4>
                      <Table
                        columns={publishedReceiptColumns}
                        dataSource={data.block.Block.PublishedReceipts || []}
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
                          showQuickJumper
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
