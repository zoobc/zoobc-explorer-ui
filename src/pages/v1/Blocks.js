import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Typography, Table, Pagination } from 'antd'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import { blockColumns } from '../../config/table-columns'

const { Title } = Typography

const GET_BLOCKS_DATA = gql`
  query getBlocks($page: Int) {
    blocks(page: $page, limit: 15, order: "-Height") {
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
                columns={blockColumns}
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
