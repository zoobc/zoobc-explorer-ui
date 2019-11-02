import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Table, Pagination } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import gql from 'graphql-tag'

import { getSortString, isEmptyObject } from '../utils'
import DefaultLayout from '../components/DefaultLayout'
import Container from '../components/Container'
import { accountColumns } from '../config/table-columns'

const defaultSort = { columnKey: 'AccountAddress', order: 'ascend' }
const GET_ACCOUNTS_DATA = gql`
  query getAccounts($page: Int, $sorter: String) {
    accounts(page: $page, limit: 15, order: $sorter) {
      Accounts {
        AccountAddress
        BalanceConversion
        LastActive
        TotalRewardsConversion
        TotalFeesPaidConversion
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

  const { loading, data } = useQuery(GET_ACCOUNTS_DATA, {
    variables: {
      page: currentPage,
      sorter: getSortString(sorted),
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
      <Container>
        <Row className="accounts-row">
          <Col span={24}>
            <Card className="accounts-card">
              <Row>
                <Col span={24}>
                  <h5>
                    <i className="bcz-user" />
                    <strong>{t('Accounts')}</strong>
                  </h5>
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
    </DefaultLayout>
  )
}

export default Accounts
