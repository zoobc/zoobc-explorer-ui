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

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, gql } from '@apollo/client'
import { PageHeader, Button, Table, Pagination } from 'antd'

import { getSortString } from '../../../utils'
import Container from '../../../components/Container'
import { keywordColumns } from '../../../config/table-columns'

const defaultSort = { columnKey: 'Keyword', order: 'ascend' }
const QUERY_KEYWORDS = gql`
  query keywords($page: Int, $sorter: String) {
    keywords(page: $page, limit: 15, order: $sorter) {
      Success
      Message
      Data {
        Keyword
        Content
        ExpiredAt
        Seen
        CreatedAt
        CreatedBy {
          Identifier
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

export default props => {
  const { history } = props
  const { t } = useTranslation()
  const [datas, setDatas] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sorted, setSorted] = useState(defaultSort)
  const [paginate, setPaginate] = useState({ Page: 0, Count: 0, Total: 0 })
  const { loading, data, error, refetch, networkStatus } = useQuery(QUERY_KEYWORDS, {
    variables: {
      page: parseInt(currentPage),
      sorter: getSortString(sorted),
    },
    notifyOnNetworkStatusChange: true,
  })

  const onChangeTable = (pagination, filters, sorter) => {
    setSorted(sorter && sorter.order ? sorter : defaultSort)
  }

  const columns = keywordColumns.map(item => {
    item.sortDirections = ['descend', 'ascend']
    item.sorter = item.sorting
      ? (a, b) => (a[item.dataIndex] ? a[item.dataIndex].length - b[item.dataIndex].length : null)
      : false
    item.sortOrder = sorted.columnKey === item.dataIndex && sorted.order
    return item
  })

  useEffect(() => {
    if (!loading && !error && data) {
      const { Success, Data, Paginate } = data.keywords
      if (Success) {
        const datas = Data.map((item, key) => {
          return {
            key,
            ...item,
          }
        })
        setDatas(datas)
        setPaginate(Paginate)
      }
    }
  }, [loading, error, data]) // eslint-disable-line

  return (
    <Container>
      <PageHeader
        ghost={false}
        className="block-card"
        title={<h4 className="block-card-title page-title">{t('keywords')}</h4>}
        extra={[
          <Button key="refresh" onClick={() => refetch()}>
            {t('refresh')}
          </Button>,
          <Button key="insert" type="primary" onClick={() => history.push('/panel/keywords/new')}>
            {t('insert new')}
          </Button>,
        ]}
      >
        <Table
          size="small"
          columns={columns}
          dataSource={datas}
          pagination={false}
          onChange={onChangeTable}
          loading={loading || networkStatus === 4}
        />

        {!!data && (
          <Pagination
            showQuickJumper
            pageSize={15}
            total={paginate.Total}
            current={paginate.Page}
            className="pagination-center"
            onChange={page => setCurrentPage(page)}
            showTotal={(total, range) =>
              total > 0 ? `${range[0]}-${range[1]} of ${total} items` : null
            }
          />
        )}
      </PageHeader>
    </Container>
  )
}
