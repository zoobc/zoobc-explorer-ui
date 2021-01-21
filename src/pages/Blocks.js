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
import { getSortString } from '../utils'
import Container from '../components/Container'
import { blockColumns } from '../config/table-columns'
import LastRefresh from '../components/LastRefresh'

const defaultSort = { columnKey: 'Height', order: 'descend' }
const GET_BLOCKS_DATA = gql`
  query getBlocks($page: Int, $sorter: String, $refresh: Boolean) {
    blocks(page: $page, limit: 15, order: $sorter, refresh: $refresh) {
      Blocks {
        BlockHash
        BlockHashFormatted
        BlockID
        Height
        Timestamp
        BlocksmithID
        BlocksmithAddress
        TotalFeeConversion
        TotalRewardsConversion
        TotalTransaction
        SkippedBlocksmiths {
          BlocksmithPublicKey
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

const Blocks = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const [blocks, setBlocks] = useState([])
  const [paginate, setPaginate] = useState({})
  const [sorted, setSorted] = useState(defaultSort)

  const onChangeTable = (pagination, filters, sorter) => {
    setSorted(sorter && sorter.order ? sorter : defaultSort)
  }
  const columns = blockColumns.map(item => {
    item.sortDirections = ['descend', 'ascend']
    item.sorter = item.sorting
      ? (a, b) => (a[item.dataIndex] ? a[item.dataIndex].length - b[item.dataIndex].length : null)
      : false
    item.sortOrder = sorted.columnKey === item.dataIndex && sorted.order
    return item
  })

  const { loading, data, refetch, networkStatus } = useQuery(GET_BLOCKS_DATA, {
    variables: {
      page: currentPage,
      sorter: getSortString(sorted),
      refresh: false,
    },
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    if (!!data) {
      const blockData = data.blocks.Blocks.map((block, key) => {
        return {
          key,
          ...block,
        }
      })

      setBlocks(blockData)
      setPaginate(data.blocks.Paginate)
    }
  }, [data])

  return (
    <>
      <Container>
        <Row className="blocks-row">
          <Col span={24}>
            <Card className="blocks-card" bordered={false}>
              <Alert />
              <Row>
                <Col span={23}>
                  <h5 className="page-title">
                    <i className="bcz-calendar" />
                    <strong>{t('recent blocks')}</strong>
                  </h5>
                  {!!data && <LastRefresh value={data.blocks.LastRefresh} />}
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
                columns={columns}
                dataSource={blocks}
                pagination={false}
                size="small"
                loading={loading || networkStatus === 4}
                onChange={onChangeTable.bind(this)}
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

export default Blocks
