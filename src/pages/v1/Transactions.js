import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Typography, Table, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'

import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import { shortenHash } from '../../utils/shorten'
import CopyToClipboard from '../../components/CopyToClipboard'

const { Title } = Typography

const GET_TRXS_DATA = gql`
  query getTransactions($page: Int) {
    transactions(page: $page, limit: 15, order: "-Timestamp") {
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

const columns = [
  {
    title: 'Transaction ID',
    dataIndex: 'TransactionID',
    key: 'TransactionID',
    render(text, record) {
      return (
        <>
          <Link to={`/transactions/${text}`}>{text}</Link>
          <CopyToClipboard text={text} keyID={`Trx-${record.key}`} showText={false} />
        </>
      )
    },
  },
  {
    title: 'Timestamp',
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(record) {
      return moment(record).format('lll')
    },
  },
  {
    title: 'Type',
    dataIndex: 'TransactionType',
    key: 'TransactionType',
  },
  {
    title: 'Sender',
    dataIndex: 'Sender',
    key: 'Sender',
    render(text, record) {
      return (
        <>
          <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
          <CopyToClipboard text={text} keyID={`Sender-${record.key}`} showText={false} />
        </>
      )
    },
  },
  {
    title: 'Recipient',
    dataIndex: 'Recipient',
    key: 'Recipient',
    render(text, record) {
      return (
        <>
          <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
          <CopyToClipboard text={text} keyID={`Recipient-${record.key}`} showText={false} />
        </>
      )
    },
  },
  {
    title: 'Confirmations',
    dataIndex: 'Confirmations',
    key: 'Confirmations',
  },
  {
    title: 'Fees',
    dataIndex: 'Fee',
    key: 'Fee',
  },
]

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
      <Container fluid>
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
                columns={columns}
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
