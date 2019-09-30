import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Typography, Table, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import { shortenHash } from '../../utils/shorten'
import CopyToClipboard from '../../components/CopyToClipboard'

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

const columns = [
  {
    title: 'Node Public Key',
    dataIndex: 'NodePublicKey',
    key: 'NodePublicKey',
    render(text, record) {
      return (
        <>
          <Link to={`/nodes/${text}`}>{shortenHash(text, 30)}</Link>
          <CopyToClipboard text={text} keyID={`Node-${record.key}`} showText={false} />
        </>
      )
    },
  },
  {
    title: 'Owner Address',
    dataIndex: 'OwnerAddress',
    key: 'OwnerAddress',
    render(text, record) {
      return (
        <>
          <Link to={`/accounts/${text}`}>{shortenHash(text, 30)}</Link>
          <CopyToClipboard text={text} keyID={`Node-${record.key}`} showText={false} />
        </>
      )
    },
  },
  {
    title: 'Node Address',
    dataIndex: 'NodeAddress',
    key: 'NodeAddress',
    render(record) {
      return !!record ? record : '-'
    },
  },
  {
    title: 'Locked Funds',
    dataIndex: 'LockedFunds',
    key: 'LockedFunds',
    render(record) {
      return !!record ? record : '-'
    },
  },
  {
    title: 'Registry Status',
    dataIndex: 'RegistryStatus',
    key: 'RegistryStatus',
    render(record) {
      return !!record.toString() ? (record.toString() === 'true' ? 'Registered' : 'In Queue') : '-'
    },
  },
  {
    title: 'Participation Score',
    dataIndex: 'ParticipationScore',
    key: 'ParticipationScore',
    render(record) {
      return !!record ? record : '-'
    },
  },
]

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
      <Container fluid>
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
                columns={columns}
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
