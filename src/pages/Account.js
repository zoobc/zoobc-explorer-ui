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

const { Panel } = Collapse

const GET_ACCOUNT_DATA = gql`
  query getAccount($AccountAddress: String!) {
    account(AccountAddress: $AccountAddress) {
      AccountAddress
      BalanceConversion
      SpendableBalanceConversion
      FirstActive
      LastActive
      TotalRewardsConversion
      TotalFeesPaidConversion
      # NodePublicKey
    }
  }
`

const GET_TRX_BY_ACCOUNT = gql`
  query getTrxByAccount($page: Int, $AccountAddress: String!) {
    transactions(page: $page, limit: 5, order: "-Height", AccountAddress: $AccountAddress) {
      Transactions {
        TransactionID
        TransactionHashFormatted
        Height
        Timestamp
        TransactionTypeName
        TransactionType
        Sender
        Recipient
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
  query getNodeByAccount($page: Int, $AccountAddress: String!) {
    nodes(page: $page, limit: 5, order: "-RegistrationTime", AccountAddress: $AccountAddress) {
      Nodes {
        NodePublicKey
        NodePublicKeyFormatted
        OwnerAddress
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
      AccountAddress: accountAddress,
    },
  })

  const trxByAccount = useQuery(GET_TRX_BY_ACCOUNT, {
    variables: {
      AccountAddress: params.id,
      page: trxCurrentPage,
    },
  })

  const nodeByAccount = useQuery(GET_NODE_BY_ACCOUNT, {
    variables: {
      AccountAddress: params.id,
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
        (data.account.AccountAddress ? (
          <Container>
            <Row className="account-row">
              <Col span={24}>
                <Row>
                  <Col span={24}>
                    <h4 className="truncate page-title">
                      {t('account')} {data.account.AccountAddress}
                    </h4>
                  </Col>
                </Row>
                <Card className="account-card" bordered={false}>
                  <h4 className="account-card-title page-title">{t('summary')}</h4>
                  <DescItem
                    label={t('account address')}
                    style={{ display: 'none' }}
                    value={
                      <CopyToClipboard text={data.account.AccountAddress} keyID="accountAddress" />
                    }
                    textClassName="monospace-text"
                  />
                  <DescItem
                    label={t('balance')}
                    style={{ display: 'none' }}
                    value={
                      <NumberFormat
                        value={data.account.BalanceConversion || 0}
                        displayType={'text'}
                        thousandSeparator={true}
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
                        value={data.account.TotalRewardsConversion || 0}
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
                        value={data.account.TotalFeesPaidConversion || 0}
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
                        scroll={{ x: 1300 }}
                        rowKey="TransactionID"
                      />
                      {!!transactions && (
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

export default Account
