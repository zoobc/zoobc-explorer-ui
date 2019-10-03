import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Row, Col, Card, Typography, Badge, Table, Pagination } from 'antd'
import NumberFormat from 'react-number-format'

import DefaultLayout from '../components/DefaultLayout'
import Container from '../components/Container'
import DescItem from '../components/DescItem'
import NotFound from '../components/Errors/NotFound'
import LoaderPage from '../components/LoaderPage'
import CopyToClipboard from '../components/CopyToClipboard'
import { blockColumns } from '../config/table-columns'

const { Title } = Typography

const GET_NODE_DATA = gql`
  query getNode($NodePublicKey: String!) {
    node(NodePublicKey: $NodePublicKey) {
      NodePublicKey
      OwnerAddress
      NodeAddress
      LockedFunds
      RegisteredBlockHeight
      ParticipationScore
      RegistryStatus
      BlocksFunds
      RewardsPaid
    }
  }
`

const GET_BLOCK_BY_NODE = gql`
  query getBlocks($page: Int, $NodePublicKey: String!) {
    blocks(page: $page, limit: 5, order: "-Height", NodePublicKey: $NodePublicKey) {
      Blocks {
        BlockID
        Height
        Timestamp
        BlocksmithID
        TotalFee
        TotalRewards
      }
      Paginate {
        Page
        Count
        Total
      }
    }
  }
`

const Node = ({ match }) => {
  const { params, url } = match
  const urlLastCharacter = url[url.length - 1]
  const [blockCurrentPage, setBlockCurrentPage] = useState(1)
  const [blocks, setBlocks] = useState([])
  const [blockPaginate, setBlockPaginate] = useState({})
  let nodePublicKey = params.id

  if (urlLastCharacter === '/') {
    nodePublicKey = `${url.split('/')[2]}/`
  }

  const { loading, data, error } = useQuery(GET_NODE_DATA, {
    variables: {
      NodePublicKey: nodePublicKey,
    },
  })

  const blockNode = useQuery(GET_BLOCK_BY_NODE, {
    variables: {
      page: blockCurrentPage,
      NodePublicKey: nodePublicKey,
    },
  })

  useEffect(() => {
    if (!!blockNode.data) {
      const blockData = blockNode.data.blocks.Blocks.map((block, key) => {
        return {
          key,
          ...block,
        }
      })

      setBlocks(blockData)
      setBlockPaginate(blockNode.data.blocks.Paginate)
    }
  }, [blockNode.data])

  return (
    <DefaultLayout>
      {!!error && <NotFound />}
      {!!loading && <LoaderPage />}
      {!error && !loading && (
        <Container>
          <Row gutter={8}>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <Title level={4}>Public Key {data.node.NodePublicKey}</Title>
                </Col>
              </Row>
              <Card className="card-summary">
                <Title level={4}>Summary</Title>
                <DescItem
                  label="Node Public Key"
                  value={<CopyToClipboard text={data.node.NodePublicKey} keyID="nodePublicKey" />}
                />
                <DescItem
                  label="Owner Address"
                  value={<CopyToClipboard text={data.node.OwnerAddress} keyID="nodePublicKey" />}
                />
                <DescItem label="Node Address" value={data.node.NodeAddress} />
                <DescItem
                  label="Locked Funds"
                  value={
                    <NumberFormat
                      value={data.node.LockedFunds || 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' BCZ'}
                    />
                  }
                />
                <DescItem label="Registered Block Height" value={data.node.RegisteredBlockHeight} />
                <DescItem label="Participation Score" value={data.node.ParticipationScore} />
                <DescItem
                  label="Registry Status"
                  value={data.node.RegistryStatus === true ? 'Registered' : 'In Queue'}
                />
                <DescItem label="Blocks Found" value={data.node.BlocksFunds} />
                <DescItem
                  label="Rewards Paid"
                  value={
                    <NumberFormat
                      value={data.node.RewardsPaid || 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' BCZ'}
                    />
                  }
                />
              </Card>
              <Card className="card-summary">
                <Title level={4}>
                  Blocks{' '}
                  <Badge className="badge-black" count={blockPaginate.Total} overflowCount={1000} />
                </Title>
                <Table
                  columns={blockColumns}
                  dataSource={blocks}
                  pagination={false}
                  size="small"
                  loading={loading}
                />
                {!!blocks && (
                  <Pagination
                    className="pagination-center"
                    current={blockCurrentPage}
                    total={blockPaginate.Total}
                    pageSize={15}
                    onChange={page => setBlockCurrentPage(page)}
                  />
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </DefaultLayout>
  )
}

export default Node
