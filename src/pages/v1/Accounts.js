import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Typography, Table, Pagination } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import { accountColumns } from '../../config/table-columns'

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
                columns={accountColumns}
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
