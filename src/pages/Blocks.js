import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Table, Pagination } from 'antd'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'

import { getSortString, isEmptyObject } from '../utils'
import Container from '../components/Container'
import { blockColumns } from '../config/table-columns'

const defaultSort = { columnKey: 'Height', order: 'descend' }
const GET_BLOCKS_DATA = gql`
  query getBlocks($page: Int, $sorter: String) {
    blocks(page: $page, limit: 15, order: $sorter) {
      Blocks {
        BlockID
        Height
        Timestamp
        BlocksmithID
        BlocksmithAddress
        TotalFeeConversion
        TotalRewardsConversion
        SkippedBlocksmiths {
          BlocksmithPublicKey
        }
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
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const [blocks, setBlocks] = useState([])
  const [paginate, setPaginate] = useState({})
  const [sorted, setSorted] = useState(defaultSort)

  const onChangeTable = (pagination, filters, sorter) => {
    setSorted(isEmptyObject(sorter) ? defaultSort : sorter)
  }

  const columns = blockColumns.map(item => {
    item.sortDirections = ['descend', 'ascend']
    item.sorter = (a, b) =>
      a[item.dataIndex] ? a[item.dataIndex].length - b[item.dataIndex].length : null
    item.sortOrder = sorted.columnKey === item.dataIndex && sorted.order
    return item
  })

  const { loading, data } = useQuery(GET_BLOCKS_DATA, {
    variables: {
      page: currentPage,
      sorter: getSortString(sorted),
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
    <>
      <Container>
        <Row className="blocks-row">
          <Col span={24}>
            <Card className="blocks-card" bordered={false}>
              <Row>
                <Col span={24}>
                  <h5>
                    <i className="bcz-calendar" />
                    <strong>{t('Recent Blocks')}</strong>
                  </h5>
                </Col>
              </Row>
              <Table
                columns={columns}
                dataSource={blocks}
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
    </>
  )
}

export default Blocks
