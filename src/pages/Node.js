import React, { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery, gql } from '@apollo/client'
import { Row, Col, Card, Badge, Table, Pagination } from 'antd'
import moment from 'moment'

import Container from '../components/Container'
import DescItem from '../components/DescItem'
import NotFound from '../components/Errors/NotFound'
import LoaderPage from '../components/LoaderPage'
import CopyToClipboard from '../components/CopyToClipboard'
import { blockColumns } from '../config/table-columns'

const GET_NODE_DATA = gql`
  query getNode($NodePublicKey: String!) {
    node(NodePublicKey: $NodePublicKey) {
      NodePublicKey
      NodePublicKeyFormatted
      OwnerAddress
      OwnerAddressFormatted
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
      RegistrationTime
    }
  }
`

const GET_BLOCK_BY_NODE = gql`
  query getBlocks($page: Int, $NodePublicKey: String!) {
    blocks(page: $page, limit: 5, order: "-Height", NodePublicKey: $NodePublicKey) {
      Blocks {
        BlockID
        BlockHash
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

const Node = ({ match }) => {
  const { params } = match
  const { t } = useTranslation()
  const [blockCurrentPage, setBlockCurrentPage] = useState(1)
  const [blocks, setBlocks] = useState([])
  const [blockPaginate, setBlockPaginate] = useState({})

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNode.data])

  return (
    <>
      {!!error && <NotFound />}
      {!!loading && <LoaderPage />}
      {!!data &&
        (data.node.NodePublicKeyFormatted ? (
          <Container>
            <Row className="node-row">
              <Col span={24}>
                <Row>
                  <Col span={24}>
                    <h4 className="truncate page-title">
                      {t('public key')} {data.node.NodePublicKeyFormatted}
                    </h4>
                  </Col>
                </Row>
                <Card className="node-card" bordered={false}>
                  <h4 className="node-card-title page-title">{t('summary')}</h4>
                  <DescItem
                    label={t('node public key')}
                    text={t(
                      'a string of letters and numbers that are used to receive amount of zoobc. works similar to a traditional bank account number and can be shared publicly with others'
                    )}
                    value={
                      <CopyToClipboard
                        text={data.node.NodePublicKeyFormatted}
                        keyID="NodePublicKeyFormatted"
                      />
                    }
                    textClassName="monospace-text"
                  />
                  <DescItem
                    label={t('owner address')}
                    style={{ display: 'none' }}
                    value={
                      <Link to={`/accounts/${data.node.OwnerAddressFormatted}`}>
                        {data.node.OwnerAddressFormatted}
                      </Link>
                    }
                    textClassName="monospace-text"
                    // value={<CopyToClipboard text={data.node.OwnerAddress} keyID="nodePublicKey" />}
                  />
                  {/* <DescItem label={t('node address')} value={data.node.NodeAddress} /> */}
                  <DescItem
                    label={t('timestamp')}
                    style={{ display: 'none' }}
                    value={moment(data.node.RegistrationTime).format('lll')}
                    textClassName="monospace-text"
                  />
                  <DescItem
                    label={t('locked funds')}
                    text={t('amount of zoobc to be locked as security money for node')}
                    value={
                      <NumberFormat
                        value={data.node.LockedFunds || 0}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={' ZBC'}
                        className="monospace-text"
                      />
                    }
                  />
                  <DescItem
                    label={t('registered block height')}
                    style={{ display: 'none' }}
                    value={
                      <Link to={`/blocks/${data.node.RegisteredBlockHeight}`}>
                        {data.node.RegisteredBlockHeight}
                      </Link>
                    }
                  />
                  {/* <DescItem label={t('participation score')} value={data.node.ParticipationScore} /> */}
                  <DescItem
                    label={t('registry status')}
                    style={{ display: 'none' }}
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
                  <h4 className="node-card-title page-title">
                    {t('blocks')}
                    <Badge
                      className="badge-black"
                      count={blockPaginate.Total}
                      overflowCount={1000}
                    />
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
        ) : (
          <NotFound />
        ))}
    </>
  )
}

export default Node
