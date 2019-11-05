import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Table, Pagination } from 'antd'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'

import { getSortString, isEmptyObject } from '../utils'
import DefaultLayout from '../components/DefaultLayout'
import Container from '../components/Container'
import { transactionColumns } from '../config/table-columns'

const defaultSort = { columnKey: 'Timestamp', order: 'descend' }
const GET_TRXS_DATA = gql`
  query getTransactions($page: Int, $sorter: String) {
    transactions(page: $page, limit: 15, order: $sorter) {
      Transactions {
        TransactionID
        BlockID
        Height
        Timestamp
        TransactionTypeName
        Sender
        Recipient
        Confirmations
        FeeConversion
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

const Transactions = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const [transactions, setTransactions] = useState([])
  const [paginate, setPaginate] = useState({})
  const [sorted, setSorted] = useState(defaultSort)

  const onChangeTable = (pagination, filters, sorter) => {
    setSorted(isEmptyObject(sorter) ? defaultSort : sorter)
  }

  const columns = transactionColumns.map(item => {
    item.sortDirections = ['ascend', 'descend']
    item.sorter = (a, b) =>
      a[item.dataIndex] ? a[item.dataIndex].length - b[item.dataIndex].length : null
    item.sortOrder = sorted.columnKey === item.dataIndex && sorted.order
    return item
  })

  const { loading, data } = useQuery(GET_TRXS_DATA, {
    variables: {
      page: currentPage,
      sorter: getSortString(sorted),
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
        <Row className="transactions-row">
          <Col span={24}>
            <Card className="transactions-card" bordered={false}>
              <Row>
                <Col span={24}>
                  <h5>
                    <i className="bcz-calendar" />
                    <strong>{t('Recent Transactions')}</strong>
                  </h5>
                </Col>
              </Row>
              <Table
                className="transactions-table"
                columns={columns}
                dataSource={transactions}
                pagination={false}
                size="small"
                loading={loading}
                onChange={onChangeTable.bind(this)}
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
