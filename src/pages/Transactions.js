import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, gql } from '@apollo/client'
import { Row, Col, Card, Table, Pagination, Button } from 'antd'

import { getSortString, isEmptyObject } from '../utils'
import Container from '../components/Container'
import { transactionColumns } from '../config/table-columns'
import LastRefresh from '../components/LastRefresh'

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
        TransactionType
        Sender
        Recipient
        Status
        FeeConversion
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
      LastRefresh @client
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

  const { loading, data, networkStatus, refetch } = useQuery(GET_TRXS_DATA, {
    variables: {
      page: currentPage,
      sorter: getSortString(sorted),
    },
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    if (!!data) {
      const trxData = data.transactions.Transactions.map((trx, key) => {
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
      setPaginate(data.transactions.Paginate)
    }
  }, [data])

  return (
    <>
      <Container>
        <Row className="transactions-row">
          <Col span={24}>
            <Card className="transactions-card" bordered={false}>
              <Row>
                <Col span={23}>
                  <h5 className="page-title">
                    <i className="bcz-calendar" />
                    <strong>{t('Recent Transactions')}</strong>
                  </h5>
                  {!loading && <LastRefresh value={data.transactions.LastRefresh} />}
                </Col>
                <Col>
                  <Button
                    shape="circle"
                    icon="reload"
                    onClick={() => refetch()}
                    loading={loading || networkStatus === 4}
                  />
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
                scroll={{ x: 1300 }}
                rowKey="TransactionID"
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
    </>
  )
}

export default Transactions
