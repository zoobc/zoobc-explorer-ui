import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Table, Pagination, Badge } from 'antd'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import NumberFormat from 'react-number-format'
import { useTranslation } from 'react-i18next'

import Container from '../components/Container'
import DescItem from '../components/DescItem'
import NotFound from '../components/Errors/NotFound'
import LoaderPage from '../components/LoaderPage'
import CopyToClipboard from '../components/CopyToClipboard'
import { transactionColumns } from '../config/table-columns'

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
      NodePublicKey
    }
  }
`

const GET_TRX_BY_ACCOUNT = gql`
  query getTrxByAccount($page: Int, $AccountAddress: String!) {
    transactions(page: $page, limit: 5, order: "-Height", AccountAddress: $AccountAddress) {
      Transactions {
        TransactionID
        Height
        Timestamp
        TransactionTypeName
        Sender
        Recipient
        Confirmations
        FeeConversion
        BlockID
        SendMoney {
          AmountConversion
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
  query getNodes($page: Int, $AccountAddress: String!) {
    nodes(page: $page, limit: 5, order: "NodePublicKey", AccountAddress: $AccountAddress) {
      Nodes {
        NodePublicKey
        OwnerAddress
        NodeAddress
        LockedFunds
        RegistryStatus
        ParticipationScore
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
        return {
          key,
          ...trx,
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
  }, [nodeByAccount.data, trxByAccount.data])

  return (
    <>
      {!!error && <NotFound />}
      {!!loading && <LoaderPage />}
      {!error && !loading && (
        <Container>
          <Row className="account-row">
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <h4 className="truncate">
                    {t('Account')} {data.account.AccountAddress}
                  </h4>
                </Col>
              </Row>
              <Card className="account-card" bordered={false}>
                <h4 className="account-card-title">{t('Summary')}</h4>
                <DescItem
                  label={t('Account Address')}
                  value={
                    <CopyToClipboard text={data.account.AccountAddress} keyID="accountAddress" />
                  }
                />
                <DescItem
                  label={t('Balance')}
                  value={
                    <NumberFormat
                      value={data.account.BalanceConversion || 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' ZBC'}
                    />
                  }
                />
                <DescItem
                  label={t('Spendable Balance')}
                  value={
                    <NumberFormat
                      value={data.account.SpendableBalanceConversion || 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' ZBC'}
                    />
                  }
                />
                <DescItem label={t('First Active')} value={data.account.FirstActive} />
                <DescItem label={t('Last Active')} value={data.account.LastActive} />
                <DescItem
                  label={t('Total Rewards')}
                  value={
                    <NumberFormat
                      value={data.account.TotalRewardsConversion || 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' ZBC'}
                    />
                  }
                />
                <DescItem
                  label={t('Total Fees Paid')}
                  value={
                    <NumberFormat
                      value={data.account.TotalFeesPaidConversion || 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' ZBC'}
                    />
                  }
                />
                <DescItem label={t('Node Public Key')} value={data.account.NodePublicKey} />
              </Card>
              <Card className="account-card" bordered={false}>
                <h4 className="account-card-title">
                  {t('Transactions')}
                  <Badge className="badge-black" count={trxPaginate.Total} overflowCount={1000} />
                </h4>
                <Table
                  className="transactions-table"
                  columns={transactionColumns}
                  dataSource={transactions}
                  pagination={false}
                  size="small"
                  loading={loading}
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
              {/* <Card className="account-card" bordered={false}>
                <h4 className="account-card-title">
                  {t('Nodes')}
                  <Badge className="badge-black" count={nodePaginate.Total} overflowCount={1000} />
                </h4>
                <Table
                  columns={nodeColumns}
                  dataSource={nodes}
                  pagination={false}
                  size="small"
                  loading={loading}
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
              </Card> */}
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default Account
