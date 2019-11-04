import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Table, Pagination } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useTranslation } from 'react-i18next'

import { getSortString, isEmptyObject } from '../utils'
import DefaultLayout from '../components/DefaultLayout'
import Container from '../components/Container'
import { nodeColumns } from '../config/table-columns'

const defaultSort = { columnKey: 'NodePublicKey', order: 'ascend' }
const GET_NODES_DATA = gql`
  query getNodes($page: Int, $sorter: String) {
    nodes(page: $page, limit: 15, order: $sorter) {
      Nodes {
        NodePublicKey
        OwnerAddress
        NodeAddress
        LockedFunds
        RegistryStatus
        ParticipationScore
      }
      Paginate {
        Page
        Count
        Total
      }
    }
  }
`

const Nodes = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const [nodes, setNodes] = useState([])
  const [paginate, setPaginate] = useState({})
  const [sorted, setSorted] = useState(defaultSort)

  const onChangeTable = (pagination, filters, sorter) => {
    setSorted(isEmptyObject(sorter) ? defaultSort : sorter)
  }

  const columns = nodeColumns.map(item => {
    item.sortDirections = ['ascend', 'descend']
    item.sorter = (a, b) =>
      a[item.dataIndex] ? a[item.dataIndex].length - b[item.dataIndex].length : null
    item.sortOrder = sorted.columnKey === item.dataIndex && sorted.order
    return item
  })

  const { loading, data } = useQuery(GET_NODES_DATA, {
    variables: {
      page: currentPage,
      sorter: getSortString(sorted),
    },
  })

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
  }, [data])

  return (
    <DefaultLayout>
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
            </Card>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  )
}

export default Nodes
