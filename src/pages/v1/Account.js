import React from 'react'
import { Row, Col, Card, Typography, Table, Pagination, Badge } from 'antd'
import { Link } from 'react-router-dom'

import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import DescItem from '../../components/DescItem'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import NotFound from '../../components/Errors/NotFound'
import LoaderPage from '../../components/Loader/LoaderPage'
import CopyToClipboard from '../../components/CopyToClipboard'

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

const columnsNode = [
  {
    title: 'Node ID',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: 'Status',
    dataIndex: 'coins',
    key: 'coins',
  },
]

const Account = ({ match }) => {
  const { params, url } = match
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
                  <Title level={4}>Account #{data.account.AccountAddress}</Title>
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
                <DescItem label="Balance" value={data.account.Balance} />
                <DescItem label="Spendable Balance" value={data.account.SpendableBalance} />
                <DescItem label="First Active" value={data.account.FirstActive} />
                <DescItem label="Last Active" value={data.account.LastActive} />
                <DescItem label="Total Rewards" value={data.account.TotalRewards} />
                <DescItem label="Total Fees Paid" value={data.account.TotalFeesPaid} />
                <DescItem label="Node Public Key" value={data.account.NodePublicKey} />
              </Card>
              <Card className="card-summary">
                <Title level={4}>
                  Node Info <Badge className="badge-black" count={425} overflowCount={1000} />
                </Title>
                <Table columns={columnsNode} dataSource={[]} pagination={false} size="small" />
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

export default Account
