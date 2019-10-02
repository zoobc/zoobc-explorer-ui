import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Typography, Table, Pagination } from 'antd'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import { nodeColumns } from '../../config/table-columns'

const { Title } = Typography

const GET_NODES_DATA = gql`
  query getNodes($page: Int) {
    nodes(page: $page, limit: 15, order: "Height") {
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
  const [currentPage, setCurrentPage] = useState(1)
  const [nodes, setNodes] = useState([])
  const [paginate, setPaginate] = useState({})

  const { loading, data } = useQuery(GET_NODES_DATA, {
    variables: {
      page: currentPage,
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
        <Row gutter={8}>
          <Col span={24}>
            <Card>
              <Row>
                <Col span={24}>
                  <Title level={4}>
                    <i className="bcz-node" />
                    Nodes
                  </Title>
                </Col>
              </Row>
              <Table
                columns={nodeColumns}
                dataSource={nodes}
                pagination={false}
                size="small"
                loading={loading}
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
