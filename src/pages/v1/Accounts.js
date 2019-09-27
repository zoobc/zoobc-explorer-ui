import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Typography, Table, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import { shortenHash } from '../../utils/shorten'
import CopyToClipboard from '../../components/CopyToClipboard'

const { Title } = Typography

const GET_ACCOUNTS_DATA = gql`
  query getAccounts($page: Int) {
    accounts(page: $page, limit: 15, order: "AccountAddress") {
      Accounts {
        AccountAddress
        Balance
        LastActive
        TotalRewards
        TotalFeesPaid
      }
      Paginate {
        Page
        Count
        Total
      }
    }
  }
`

const columns = [
  {
    title: 'Address',
    dataIndex: 'AccountAddress',
    key: 'AccountAddress',
    render(text, record) {
      return (
        <>
          <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
          <CopyToClipboard text={text} keyID={`Account-${record.key}`} showText={false} />
        </>
      )
    },
  },
  {
    title: 'Balance',
    dataIndex: 'Balance',
    key: 'Balance',
  },
  {
    title: 'Last Active',
    dataIndex: 'LastActive',
    key: 'LastActive',
    render(record) {
      return !!record ? record : '-'
    },
  },
  {
    title: 'Rewards',
    dataIndex: 'TotalRewards',
    key: 'TotalRewards',
    render(record) {
      return !!record ? record : '-'
    },
  },
  {
    title: 'Fees',
    dataIndex: 'TotalFeesPaid',
    key: 'TotalFeesPaid',
    render(record) {
      return !!record ? record : '-'
    },
  },
]

const Accounts = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [accounts, setAccounts] = useState([])
  const [paginate, setPaginate] = useState({})

  const { loading, data } = useQuery(GET_ACCOUNTS_DATA, {
    variables: {
      page: currentPage,
    },
  })

  useEffect(() => {
    if (!!data) {
      const accountData = data.accounts.Accounts.map((account, key) => {
        return {
          key,
          ...account,
        }
      })

      setAccounts(accountData)
      setPaginate(data.accounts.Paginate)
    }
  }, [data])

  return (
    <DefaultLayout>
      <Container fluid>
        <Row gutter={8}>
          <Col span={24}>
            <Card>
              <Row>
                <Col span={24}>
                  <Title level={4}>
                    <i className="bcz-user" />
                    Accounts
                  </Title>
                </Col>
              </Row>
              <Table
                columns={columns}
                dataSource={accounts}
                pagination={false}
                size="small"
                loading={loading}
              />
              {!!data && (
                <Pagination
                  className="pagination-center"
                  current={paginate.Page}
                  total={paginate.Total}
                  pageSize={15}
                  onChange={page => setCurrentPage(page)}
                />
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  )
}

export default Accounts
