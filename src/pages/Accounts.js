import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, gql } from '@apollo/client'
import { Row, Col, Card, Table, Pagination, Button } from 'antd'

import Container from '../components/Container'
import { getSortString, isEmptyObject } from '../utils'
import { accountColumns } from '../config/table-columns'
import LastRefresh from '../components/LastRefresh'

const defaultSort = { columnKey: 'AccountAddress', order: 'ascend' }
const GET_ACCOUNTS_DATA = gql`
  query getAccounts($page: Int, $sorter: String) {
    accounts(page: $page, limit: 15, order: $sorter) {
      Accounts {
        AccountAddress
        BalanceConversion
        FirstActive
        LastActive
        TotalRewardsConversion
        TotalFeesPaidConversion
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
const Accounts = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const [accounts, setAccounts] = useState([])
  const [paginate, setPaginate] = useState({})
  const [sorted, setSorted] = useState(defaultSort)

  const onChangeTable = (pagination, filters, sorter) => {
    setSorted(isEmptyObject(sorter) ? defaultSort : sorter)
  }

  const columns = accountColumns.map(item => {
    item.sortDirections = ['ascend', 'descend']
    item.sorter = (a, b) =>
      a[item.dataIndex] ? a[item.dataIndex].length - b[item.dataIndex].length : null
    item.sortOrder = sorted.columnKey === item.dataIndex && sorted.order
    return item
  })

  const { loading, data, networkStatus, refetch } = useQuery(GET_ACCOUNTS_DATA, {
    variables: {
      page: currentPage,
      sorter: getSortString(sorted),
    },
    notifyOnNetworkStatusChange: true,
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
    <>
      <Container>
        <Row className="accounts-row">
          <Col span={24}>
            <Card className="accounts-card" bordered={false}>
              <Row>
                <Col span={23}>
                  <h5 className="page-title">
                    <i className="bcz-user" />
                    <strong>{t('accounts')}</strong>
                  </h5>
                  {!loading && <LastRefresh value={data.accounts.LastRefresh} />}
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
                columns={columns}
                dataSource={accounts}
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
    </>
  )
}

export default Accounts
