import React, { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery, gql } from '@apollo/client'
import { Row, Col, Card, Badge, Table, Pagination, Button } from 'antd'

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
      NodeAddressInfo {
        Address
        Port
      }
      LockedFunds
      RegisteredBlockHeight
      ParticipationScore
      RegistrationStatus
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
        BlocksmithAddress
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
  const { params } = match
  const { t } = useTranslation()
  const [blockCurrentPage, setBlockCurrentPage] = useState(1)
  const [blocks, setBlocks] = useState([])
  const [blockPaginate, setBlockPaginate] = useState({})
  const [keyword, setKeyword] = useState('0')
  const { doSearch } = useSearch(keyword, history)

  const { loading, data, error } = useQuery(GET_NODE_DATA, {
    variables: {
      NodePublicKey: params.id,
    },
  })

  const blockNode = useQuery(GET_BLOCK_BY_NODE, {
    variables: {
      page: blockCurrentPage,
      NodePublicKey: params.id,
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
    <>
      {!!error && <NotFound />}
      {!!loading && <LoaderPage />}
      {!error && !loading && (
        <Container>
          <Row className="node-row">
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <h4 className="truncate">
                    {t('public key')} {data.node.NodePublicKey}
                  </h4>
                </Col>
              </Row>
              <Card className="node-card" bordered={false}>
                <h4 className="node-card-title">{t('summary')}</h4>
                <DescItem
                  label={t('node public key')}
                  value={<CopyToClipboard text={data.node.NodePublicKey} keyID="nodePublicKey" />}
                />
                <DescItem
                  label={t('owner address')}
                  value={
                    <Link to={`/accounts/${data.node.OwnerAddress}`}>{data.node.OwnerAddress}</Link>
                  }
                  // value={<CopyToClipboard text={data.node.OwnerAddress} keyID="nodePublicKey" />}
                />
                {/* <DescItem label={t('node address')} value={data.node.NodeAddress} /> */}
                <DescItem
                  label={t('locked funds')}
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
                  label={t('registered block height')}
                  value={
                    <Button
                      type="link"
                      size="small"
                      onClick={doSearch}
                      style={{ padding: '0px 0px 15px 0px' }}
                    >
                      {data.node.RegisteredBlockHeight}
                    </Button>
                  }
                />
                {/* <DescItem label={t('participation score')} value={data.node.ParticipationScore} /> */}
                <DescItem
                  label={t('registry status')}
                  // value={data.node.RegistrationStatus === true ? 'Registered' : 'In Queue'}
                  value={
                    data.node.RegistrationStatus === 0
                      ? 'Registered'
                      : data.node.RegistrationStatus === 1
                      ? 'In Queue'
                      : 'Stray'
                  }
                />
                {/* <DescItem label={t('blocks found')} value={data.node.BlocksFunds} /> */}
                {/* <DescItem
                  label={t('rewards paid')}
                  value={
                    <NumberFormat
                      value={data.node.RewardsPaid || 0}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' ZBC'}
                    />
                  }
                /> */}
              </Card>
              <Card className="node-card" bordered={false}>
                <h4 className="node-card-title">
                  {t('blocks')}
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
    </>
  )
}

export default Node
