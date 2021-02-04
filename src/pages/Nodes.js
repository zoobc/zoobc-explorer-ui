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
import { Row, Col, Card, Table, Pagination, Tabs, Button } from 'antd'
import { useTranslation } from 'react-i18next'

import { isEmptyObject } from '../utils'
import Container from '../components/Container'
import { nodeColumns } from '../config/table-columns'
import useFetchNode from '../hooks/useFetchNode'
import LastRefresh from '../components/LastRefresh'

const { TabPane } = Tabs

const defaultSort = { columnKey: 'RegisteredBlockHeight', order: 'descend' }

const Nodes = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const [nodes, setNodes] = useState([])
  const [paginate, setPaginate] = useState({})
  const [sorted, setSorted] = useState(defaultSort)
  const [tabValue, setTabValue] = useState(3)

  const columns = nodeColumns.map(item => {
    item.sortDirections = ['ascend', 'descend']
    item.sorter = (a, b) =>
      a[item.dataIndex] ? a[item.dataIndex].length - b[item.dataIndex].length : null
    item.sortOrder = sorted.columnKey === item.dataIndex && sorted.order
    return item
  })

  const { doFetch, loading, data, refetch } = useFetchNode(currentPage, sorted, tabValue)

  useEffect(() => {
    doFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!!data) {
      const nodeData = data.nodes.Nodes.map((node, key) => {
        return {
          key,
          ...node,
        }
      })

      setNodes(nodeData)
      setPaginate(data.nodes.Paginate)
    }
  }, [data, tabValue])

  const onChangeTab = value => {
    setTabValue(value)
    doFetch()
  }

  const onChangeTable = (pagination, filters, sorter) => {
    setSorted(isEmptyObject(sorter) ? defaultSort : sorter)
  }

  const DisplayTable = () => (
    <>
      <Table
        columns={columns}
        dataSource={nodes}
        pagination={false}
        size="small"
        loading={loading}
        onChange={onChangeTable.bind(this)}
        scroll={{ x: 1300 }}
      />
      {!!data && (
        <Pagination
          showQuickJumper
          className="pagination-center"
          current={paginate.Page}
          total={paginate.Total}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          pageSize={15}
          onChange={page => setCurrentPage(page)}
        />
      )}
    </>
  )

  return (
    <>
      <Container>
        <Row className="nodes-row">
          <Col span={24}>
            <Card className="nodes-card" bordered={false}>
              <Row>
                <Col span={22}>
                  <h5 className="page-title">
                    <i className="bcz-node" />
                    <strong>{t('nodes')}</strong>
                  </h5>
                  {!!data && <LastRefresh value={data.nodes.LastRefresh} />}
                </Col>
                <Col span={2}>
                  <Button
                    shape="circle"
                    icon="reload"
                    onClick={() => refetch({ refresh: true })}
                    loading={loading}
                  />
                </Col>
              </Row>
              <Tabs defaultActiveKey="3" onChange={onChangeTab} className="table">
                <TabPane tab={t('all')} key="3">
                  <DisplayTable />
                </TabPane>
                <TabPane tab={t('registered')} key="0">
                  <DisplayTable />
                </TabPane>
                <TabPane tab={t('in queue')} key="1">
                  <DisplayTable />
                </TabPane>
                <TabPane tab={t('stray')} key="2">
                  <DisplayTable />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Nodes
