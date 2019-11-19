import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Table, Pagination, Tabs } from 'antd'
import { useTranslation } from 'react-i18next'

import { isEmptyObject } from '../utils'
import DefaultLayout from '../components/DefaultLayout'
import Container from '../components/Container'
import { nodeColumns } from '../config/table-columns'
import useFetchNode from '../hooks/useFetchNode'

const { TabPane } = Tabs

const defaultSort = { columnKey: 'NodePublicKey', order: 'ascend' }

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

  const { doFetch, loading, data } = useFetchNode(currentPage, sorted, tabValue)

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
    </>
  )

  return (
    <>
      <Container>
        <Row className="nodes-row">
          <Col span={24}>
            <Card className="nodes-card" bordered={false}>
              <Row>
                <Col span={24}>
                  <h5>
                    <i className="bcz-node" />
                    <strong>{t('Nodes')}</strong>
                  </h5>
                </Col>
              </Row>
              <Tabs defaultActiveKey="3" onChange={onChangeTab}>
                <TabPane tab="All" key="3">
                  <DisplayTable />
                </TabPane>
                <TabPane tab="Registered" key="0">
                  <DisplayTable />
                </TabPane>
                <TabPane tab="In Queue" key="1">
                  <DisplayTable />
                </TabPane>
                <TabPane tab="Stray" key="2">
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
