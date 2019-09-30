import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Typography, Table, Pagination, Badge } from 'antd'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import NumberFormat from 'react-number-format'

import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import DescItem from '../../components/DescItem'
import NotFound from '../../components/Errors/NotFound'
import LoaderPage from '../../components/Loader/LoaderPage'
import CopyToClipboard from '../../components/CopyToClipboard'
import { transactionColumns, nodeColumns } from '../../config/table-columns'

const { Title } = Typography

const GET_ACCOUNT_DATA = gql`
  query getAccount($AccountAddress: String!) {
    account(AccountAddress: $AccountAddress) {
      AccountAddress
      Balance
      SpendableBalance
      FirstActive
      LastActive
      TotalRewards
      TotalFeesPaid
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
    <DefaultLayout>
      {!!error && <NotFound />}
      {!!loading && <LoaderPage />}
      {!error && !loading && (
        <Container fluid>
          <Row gutter={8}>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <Title level={4}>Account {data.account.AccountAddress}</Title>
                </Col>
              </Row>
              <Card className="card-summary">
                <Title level={4}>Summary</Title>
                <DescItem
                  label="Account Address"
                  value={
                    <CopyToClipboard text={data.account.AccountAddress} keyID="accountAddress" />
                  }
                />
                <DescItem
                  label="Balance"
                  value={
                    <NumberFormat
                      value={data.account.Balance || 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' BCZ'}
                    />
                  }
                />
                <DescItem
                  label="Spendable Balance"
                  value={
                    <NumberFormat
                      value={data.account.SpendableBalance || 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' BCZ'}
                    />
                  }
                />
                <DescItem label="First Active" value={data.account.FirstActive} />
                <DescItem label="Last Active" value={data.account.LastActive} />
                <DescItem
                  label="Total Rewards"
                  value={
                    <NumberFormat
                      value={data.account.TotalRewards || 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' BCZ'}
                    />
                  }
                />
                <DescItem
                  label="Total Fees Paid"
                  value={
                    <NumberFormat
                      value={data.account.TotalFeesPaid || 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' BCZ'}
                    />
                  }
                />
                <DescItem label="Node Public Key" value={data.account.NodePublicKey} />
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
              <Card>
                <Title level={4}>
                  Nodes{' '}
                  <Badge className="badge-black" count={nodePaginate.Total} overflowCount={1000} />
                </Title>
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
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </DefaultLayout>
  )
}

export default Account
