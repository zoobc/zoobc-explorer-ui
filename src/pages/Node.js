import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Row, Col, Card, Badge, Table, Pagination } from 'antd'
import NumberFormat from 'react-number-format'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import DefaultLayout from '../components/DefaultLayout'
import Container from '../components/Container'
import DescItem from '../components/DescItem'
import NotFound from '../components/Errors/NotFound'
import LoaderPage from '../components/LoaderPage'
import CopyToClipboard from '../components/CopyToClipboard'
import { blockColumns } from '../config/table-columns'
import useSearch from '../hooks/useSearch'

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

const Node = ({ match, history }) => {
  const { params, url } = match
  const { t } = useTranslation()
  const urlLastCharacter = url[url.length - 1]
  const [blockCurrentPage, setBlockCurrentPage] = useState(1)
  const [blocks, setBlocks] = useState([])
  const [blockPaginate, setBlockPaginate] = useState({})
  const [keyword, setKeyword] = useState('0')
  const { doSearch } = useSearch(keyword, history)
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
      setKeyword(`${data.node.RegisteredBlockHeight}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNode.data])

  return (
    <DefaultLayout>
      {!!error && <NotFound />}
      {!!loading && <LoaderPage />}
      {!error && !loading && (
        <Container>
          <Row className="node-row">
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <h4>
                    {t('Public Key')} {data.node.NodePublicKey}
                  </h4>
                </Col>
              </Row>
              <Card className="node-card" bordered={false}>
                <h4 className="node-card-title">{t('Summary')}</h4>
                <DescItem
                  label={t('Node Public Key')}
                  value={<CopyToClipboard text={data.node.NodePublicKey} keyID="nodePublicKey" />}
                />
                <DescItem
                  label={t('Owner Address')}
                  value={<CopyToClipboard text={data.node.OwnerAddress} keyID="nodePublicKey" />}
                />
                <DescItem label={t('Node Address')} value={data.node.NodeAddress} />
                <DescItem
                  label={t('Locked Funds')}
                  value={
                    <NumberFormat
                      value={data.node.LockedFunds || 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' ZBC'}
                    />
                  }
                />
                <DescItem
                  label={t('Registered Block Height')}
                  value={<Link onClick={doSearch}>{data.node.RegisteredBlockHeight}</Link>}
                />
                <DescItem label={t('Participation Score')} value={data.node.ParticipationScore} />
                <DescItem
                  label={t('Registry Status')}
                  value={data.node.RegistryStatus === true ? 'Registered' : 'In Queue'}
                />
                <DescItem label={t('Blocks Found')} value={data.node.BlocksFunds} />
                <DescItem
                  label={t('Rewards Paid')}
                  value={
                    <NumberFormat
                      value={data.node.RewardsPaid || 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' ZBC'}
                    />
                  }
                />
              </Card>
              <Card className="node-card" bordered={false}>
                <h4 className="node-card-title">
                  {t('Blocks')}
                  <Badge className="badge-black" count={blockPaginate.Total} overflowCount={1000} />
                </h4>
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
