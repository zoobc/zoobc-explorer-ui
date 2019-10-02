import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Typography, Table, Pagination } from 'antd'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import { transactionColumns } from '../../config/table-columns'

const { Title } = Typography

const GET_TRXS_DATA = gql`
  query getTransactions($page: Int) {
    transactions(page: $page, limit: 15, order: "-Height") {
      Transactions {
        TransactionID
        Height
        Timestamp
        TransactionType
        Sender
        Recipient
        Confirmations
        Fee
      }
      Paginate {
        Page
        Count
        Total
      }
    }
  }
`

const Transactions = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [transactions, setTransactions] = useState([])
  const [paginate, setPaginate] = useState({})

  const { loading, data } = useQuery(GET_TRXS_DATA, {
    variables: {
      page: currentPage,
    },
  })

  useEffect(() => {
    if (!!data) {
      const trxData = data.transactions.Transactions.map((trx, key) => {
        return {
          key,
          ...trx,
        }
      })

      setTransactions(trxData)
      setPaginate(data.transactions.Paginate)
    }
  }, [data])

  return (
    <DefaultLayout>
      <Container>
        <Row gutter={8}>
          <Col span={24}>
            <Card>
              <Row>
                <Col span={24}>
                  <Title level={4}>
                    <i className="bcz-calendar" />
                    Recent Transactions
                  </Title>
                </Col>
              </Row>
              <Table
                columns={transactionColumns}
                dataSource={transactions}
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

export default Transactions
