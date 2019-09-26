import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Typography, Table, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'

import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import { shortenHash } from '../../utils/shorten'
import CopyToClipboard from '../../components/CopyToClipboard'

const { Title } = Typography

const GET_BLOCKS_DATA = gql`
  query getBlocks($page: Int) {
    blocks(page: $page, limit: 15, order: "-Timestamp") {
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

const columns = [
  {
    title: 'Block ID',
    dataIndex: 'BlockID',
    key: 'BlockID',
    render(text, record) {
      return (
        <>
          <Link to={`/blocks/${text}`}>{text}</Link>
          <CopyToClipboard text={text} keyID={`Block-${record.key}`} showText={false} />
        </>
      )
    },
  },
  {
    title: 'Height',
    dataIndex: 'Height',
    key: 'Height',
    render(text, record) {
      return <Link to={`/blocks/${record.BlockID}`}>{text}</Link>
    },
  },
  {
    title: 'Timestamp',
    dataIndex: 'Timestamp',
    key: 'Timestamp',
    render(record) {
      return moment(record).format('lll')
    },
  },
  {
    title: 'Blocksmith',
    dataIndex: 'BlocksmithID',
    key: 'BlocksmithID',
    render(record) {
      return shortenHash(record, 30)
    },
  },
  {
    title: 'Fee',
    dataIndex: 'TotalFee',
    key: 'TotalFee',
  },
  {
    title: 'Rewards',
    dataIndex: 'TotalRewards',
    key: 'TotalRewards',
  },
]

const Blocks = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [blocks, setBlocks] = useState([])
  const [paginate, setPaginate] = useState({})

  const { loading, data } = useQuery(GET_BLOCKS_DATA, {
    variables: {
      page: currentPage,
    },
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
    <DefaultLayout>
      <Container fluid>
        <Row gutter={8}>
          <Col span={24}>
            <Card>
              <Row>
                <Col span={24}>
                  <Title level={4}>
                    <i className="bcz-calendar" />
                    Recent Blocks
                  </Title>
                </Col>
              </Row>
              <Table
                columns={columns}
                dataSource={blocks}
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

export default Blocks
