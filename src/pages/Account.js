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

import React, { useState, useEffect } from 'react'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import { useTranslation } from 'react-i18next'
import { useQuery, gql } from '@apollo/client'
import { Row, Col, Card, Table, Pagination, Badge, Collapse } from 'antd'

import Container from '../components/Container'
import DescItem from '../components/DescItem'
import NotFound from '../components/Errors/NotFound'
import LoaderPage from '../components/LoaderPage'
import CopyToClipboard from '../components/CopyToClipboard'
import { transactionColumns, nodeColumns } from '../config/table-columns'
import { convert } from '../utils'

const { Panel } = Collapse

const GET_ACCOUNT_DATA = gql`
  query getAccount($AccountAddressFormatted: String!) {
    account(AccountAddressFormatted: $AccountAddressFormatted) {
      AccountAddress
      AccountAddressFormatted
      Balance
      BalanceConversion
      SpendableBalanceConversion
      FirstActive
      LastActive
      TotalRewards
      TotalRewardsConversion
      TotalFeesPaid
      TotalFeesPaidConversion
      # NodePublicKey
    }
  }
`

const GET_TRX_BY_ACCOUNT = gql`
  query getTrxByAccount($page: Int, $AccountAddressFormatted: String!) {
    transactions(
      page: $page
      limit: 5
      order: "-Height"
      AccountAddressFormatted: $AccountAddressFormatted
    ) {
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
        Status
        FeeConversion
        BlockID
        TransactionHash
        MultisigChild
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

const GET_NODE_BY_ACCOUNT = gql`
  query getNodeByAccount($page: Int, $AccountAddressFormatted: String!) {
    nodes(
      page: $page
      limit: 5
      order: "-RegistrationTime"
      AccountAddressFormatted: $AccountAddressFormatted
    ) {
      Nodes {
        NodePublicKey
        NodePublicKeyFormatted
        OwnerAddress
        OwnerAddressFormatted
        NodeAddressInfo {
          Address
          Port
        }
        LockedFunds
        RegistrationStatus
        PercentageScore
        RegisteredBlockHeight
        RegistrationTime
      }
      Paginate {
        Page
        Count
        Total
      }
    }
  }
`

const Account = ({ match }) => {
  const { params, url } = match
  const { t } = useTranslation()

  const [trxCurrentPage, setTrxCurrentPage] = useState(1)
  const [transactions, setTransactions] = useState([])
  const [trxPaginate, setTrxPaginate] = useState({})

  const [nodeCurrentPage, setNodeCurrentPage] = useState(1)
  const [nodes, setNodes] = useState([])
  const [nodePaginate, setNodePaginate] = useState({})

  const urlLastCharacter = url[url.length - 1]
  let accountAddress = params.id

  if (urlLastCharacter === '/') {
    accountAddress = `${url.split('/')[2]}/`
  }

  const { loading, data, error } = useQuery(GET_ACCOUNT_DATA, {
    variables: {
      AccountAddressFormatted: accountAddress,
    },
  })

  const trxByAccount = useQuery(GET_TRX_BY_ACCOUNT, {
    variables: {
      AccountAddressFormatted: params.id,
      page: trxCurrentPage,
    },
  })

  const nodeByAccount = useQuery(GET_NODE_BY_ACCOUNT, {
    variables: {
      AccountAddressFormatted: params.id,
      page: nodeCurrentPage,
    },
  })

  useEffect(() => {
    if (!!trxByAccount.data) {
      const trxData = trxByAccount.data.transactions.Transactions.map((trx, key) => {
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
      setTrxPaginate(trxByAccount.data.transactions.Paginate)
    }

    if (!!nodeByAccount.data) {
      const nodeData = nodeByAccount.data.nodes.Nodes.map((node, key) => {
        return {
          key,
          ...node,
        }
      })

      setNodes(nodeData)
      setNodePaginate(nodeByAccount.data.nodes.Paginate)
    }
  }, [trxByAccount.data, nodeByAccount.data])

  return (
    <>
      {!!error && <NotFound />}
      {!!loading && <LoaderPage />}
      {!!data &&
        (data.account.AccountAddressFormatted ? (
          <Container>
            <Row className="account-row">
              <Col span={24}>
                <Row>
                  <Col span={24}>
                    <h4 className="page-title">{t('account')}</h4>
                    <div className="current-page">
                      <label className="page-title">{data.account.AccountAddressFormatted}</label>
                    </div>
                  </Col>
                </Row>
                <Card className="account-card" bordered={false}>
                  <h4 className="account-card-title page-title">{t('summary')}</h4>
                  <DescItem
                    label={t('account address')}
                    style={{ display: 'none' }}
                    value={
                      <CopyToClipboard
                        text={data.account.AccountAddressFormatted}
                        keyID="accountAddress"
                      />
                    }
                    textClassName="monospace-text"
                  />
                  <DescItem
                    label={t('balance')}
                    style={{ display: 'none' }}
                    value={
                      <NumberFormat
                        value={convert.currency(data.account.Balance)}
                        displayType={'text'}
                        thousandSeparator={false}
                        suffix={' ZBC'}
                        className="monospace-text"
                      />
                    }
                  />
                  {/* <DescItem
                  label={t('spendable balance')}
                  value={
                    <NumberFormat
                      value={data.account.SpendableBalanceConversion || 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' ZBC'}
                    />
                  }
                /> */}
                  <DescItem
                    label={t('first active')}
                    style={{ display: 'none' }}
                    value={moment(data.account.FirstActive).format('lll')}
                  />
                  <DescItem
                    label={t('last active')}
                    style={{ display: 'none' }}
                    value={moment(data.account.LastActive).format('lll')}
                  />
                  <DescItem
                    label={t('total rewards')}
                    style={{ display: 'none' }}
                    value={
                      <NumberFormat
                        value={convert.currency(data.account.TotalRewards)}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' ZBC'}
                        className="monospace-text"
                      />
                    }
                  />
                  <DescItem
                    label={t('total fees paid')}
                    style={{ display: 'none' }}
                    value={
                      <NumberFormat
                        value={convert.currency(data.account.TotalFeesPaid)}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' ZBC'}
                        className="monospace-text"
                      />
                    }
                  />
                  {/* <DescItem label={t('node public key')} value={data.account.NodePublicKeyFormatted} /> */}
                </Card>

                <Collapse className="account-collapse" bordered={false}>
                  <Panel
                    className="account-card-title account-collapse"
                    header={t('nodes')}
                    key="1"
                  >
                    <Card className="account-card" bordered={false}>
                      <h4 className="account-card-title page-title">
                        {t('nodes')}
                        <Badge
                          className="badge-black"
                          count={nodePaginate.Total}
                          overflowCount={1000}
                        />
                      </h4>
                      <Table
                        className="nodes-table"
                        columns={nodeColumns}
                        dataSource={nodes}
                        pagination={false}
                        size="small"
                        loading={loading}
                        scroll={{ x: 1300 }}
                        rowKey="NodePublicKeyFormatted"
                      />
                      {!!nodes && (
                        <Pagination
                          showQuickJumper
                          className="pagination-center"
                          current={nodePaginate.Page}
                          total={nodePaginate.Total}
                          pageSize={5}
                          onChange={page => setNodeCurrentPage(page)}
                        />
                      )}
                    </Card>
                  </Panel>
                </Collapse>

                <Collapse className="account-collapse" defaultActiveKey={['2']} bordered={false}>
                  <Panel
                    className="account-card-title account-collapse"
                    header={t('transactions')}
                    key="2"
                  >
                    <Card className="account-card" bordered={false}>
                      <h4 className="account-card-title page-title">
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
                      {!!transactions && (
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

export default Account
