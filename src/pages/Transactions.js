/** 
 * ZooBC Copyright (C) 2020 Quasisoft Limited - Hong Kong
 * This file is part of ZooBC <https://github.com/zoobc/zoobc-explorer-ui>

 * ZooBC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * ZooBC is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 * See the GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with ZooBC.  If not, see <http://www.gnu.org/licenses/>.

 * Additional Permission Under GNU GPL Version 3 section 7.
 * As the special exception permitted under Section 7b, c and e, 
 * in respect with the Author’s copyright, please refer to this section:

 * 1. You are free to convey this Program according to GNU GPL Version 3,
 *     as long as you respect and comply with the Author’s copyright by 
 *     showing in its user interface an Appropriate Notice that the derivate 
 *     program and its source code are “powered by ZooBC”. 
 *     This is an acknowledgement for the copyright holder, ZooBC, 
 *     as the implementation of appreciation of the exclusive right of the
 *     creator and to avoid any circumvention on the rights under trademark
 *     law for use of some trade names, trademarks, or service marks.

 * 2. Complying to the GNU GPL Version 3, you may distribute 
 *     the program without any permission from the Author. 
 *     However a prior notification to the authors will be appreciated.

 * ZooBC is architected by Roberto Capodieci & Barton Johnston
 * contact us at roberto.capodieci[at]blockchainzoo.com
 * and barton.johnston[at]blockchainzoo.com

 * IMPORTANT: The above copyright notice and this permission notice
 * shall be included in all copies or substantial portions of the Software.
**/

import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, gql } from '@apollo/client'
import { Row, Col, Card, Table, Pagination, Button } from 'antd'

import Alert from '../components/Alert'
import { getSortString, isEmptyObject } from '../utils'
import Container from '../components/Container'
import { transactionColumns } from '../config/table-columns'
import LastRefresh from '../components/LastRefresh'

const defaultSort = { columnKey: 'Timestamp', order: 'descend' }
const GET_TRXS_DATA = gql`
  query getTransactions($page: Int, $sorter: String, $refresh: Boolean) {
    transactions(page: $page, limit: 15, order: $sorter, refresh: $refresh) {
      Transactions {
        TransactionID
        TransactionHashFormatted
        BlockID
        Height
        Timestamp
        TransactionTypeName
        TransactionType
        Sender
        SenderFormatted
        Recipient
        RecipientFormatted
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
          SenderAddressFormatted
        }
        MultiSignatureTransactions {
          TransactionID
          TransactionHashFormatted
          BlockID
          Height
          Timestamp
          TransactionTypeName
          Sender
          SenderFormatted
          Recipient
          RecipientFormatted
          FeeConversion
          Status
        }
        EscrowTransaction {
          TransactionID
          TransactionHashFormatted
          TransactionHash
          Timestamp
          TransactionType
          TransactionTypeName
          BlockID
          Height
          Sender
          SenderFormatted
          Recipient
          RecipientFormatted
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
      refresh: false,
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
            (trx.MultisigChild && trx.MultiSignatureTransactions
              ? [...trx.MultiSignatureTransactions]
              : null) || (trx.EscrowTransaction ? [trx.EscrowTransaction] : null),
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
              <Alert />
              <Row>
                <Col span={23}>
                  <h5 className="page-title">
                    <i className="bcz-calendar" />
                    <strong>{t('recent transactions')}</strong>
                  </h5>
                  {!!data && <LastRefresh value={data.transactions.LastRefresh} />}
                </Col>
                <Col>
                  <Button
                    shape="circle"
                    icon="reload"
                    onClick={() => refetch({ refresh: true })}
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
                scroll={{ x: 1500 }}
                rowKey="TransactionID"
              />
              {!!data && (
                <Pagination
                  className="pagination-center"
                  current={paginate.Page}
                  total={paginate.Total}
                  showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
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
