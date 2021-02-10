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

import React from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { Button, Table, Pagination, Popconfirm, Divider } from 'antd'

export default ({
  datas,
  sorted,
  loading,
  paginate,
  networkStatus,
  onEdit,
  onDelete,
  onChangePage,
  onChangeTable,
}) => {
  const { t } = useTranslation()

  const Title = ({ text }) => {
    return t(text)
  }

  const DateFormat = ({ date }) => {
    return date ? moment(date).format('DD/MM/YY @ H:mm:ss') : null
  }

  const keywordColumns = [
    {
      title: <Title text="keyword" />,
      dataIndex: 'Keyword',
      key: 'Keyword',
    },
    {
      title: <Title text="expired at" />,
      dataIndex: 'ExpiredAt',
      key: 'ExpiredAt',
      render: val => <DateFormat date={val} />,
    },
    {
      title: <Title text="seen" />,
      dataIndex: 'Seen',
      key: 'Seen',
    },
    // {
    //   title: <Title text="created by" />,
    //   dataIndex: 'Identifier',
    //   key: 'Identifier',
    // },
    {
      title: <Title text="created at" />,
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      render: val => <DateFormat date={val} />,
    },
    {
      align: 'right',
      key: 'action',
      render: data => {
        return (
          <span>
            <Button type="link" size="small" onClick={() => onEdit(data.Keyword)}>
              <Title text="edit" />
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              okText={t('yes')}
              cancelText={t('cancel')}
              onConfirm={() => onDelete(data.Keyword)}
              title={t('are you sure you want to delete this data?')}
            >
              <Button type="link" style={{ color: 'red' }} size="small">
                <Title text="delete" />
              </Button>
            </Popconfirm>
          </span>
        )
      },
    },
  ]

  const columns = keywordColumns.map(item => {
    item.sortDirections = ['descend', 'ascend']
    item.sorter = item.sorting
      ? (a, b) => (a[item.dataIndex] ? a[item.dataIndex].length - b[item.dataIndex].length : null)
      : false
    item.sortOrder = sorted.columnKey === item.dataIndex && sorted.order
    return item
  })

  return (
    <>
      <Table
        size="small"
        columns={columns}
        dataSource={datas}
        pagination={false}
        onChange={onChangeTable}
        loading={loading || networkStatus === 4}
      />

      {datas && datas.length > 0 && (
        <Pagination
          showQuickJumper
          pageSize={15}
          total={paginate.Total}
          current={paginate.Page}
          className="pagination-center"
          onChange={page => onChangePage(page)}
          showTotal={(total, range) =>
            total > 0 ? `${range[0]}-${range[1]} of ${total} items` : null
          }
        />
      )}
    </>
  )
}
