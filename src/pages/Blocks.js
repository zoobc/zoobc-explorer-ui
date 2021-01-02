import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, gql } from '@apollo/client'
import { Row, Col, Card, Table, Pagination, Button } from 'antd'

import { getSortString, isEmptyObject } from '../utils'
import Container from '../components/Container'
import { blockColumns } from '../config/table-columns'
import LastRefresh from '../components/LastRefresh'

const defaultSort = { columnKey: 'Height', order: 'descend' }
const GET_BLOCKS_DATA = gql`
  query getBlocks($page: Int, $sorter: String, $refresh: Boolean) {
    blocks(page: $page, limit: 15, order: $sorter, refresh: $refresh) {
      Blocks {
        BlockHash
        BlockHashFormatted
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
      LastRefresh @client
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

  const { loading, data, refetch, networkStatus } = useQuery(GET_BLOCKS_DATA, {
    variables: {
      page: currentPage,
      sorter: getSortString(sorted),
      refresh: false,
    },
    notifyOnNetworkStatusChange: true,
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
                <Col span={23}>
                  <h5 className="page-title">
                    <i className="bcz-calendar" />
                    <strong>{t('recent blocks')}</strong>
                  </h5>
                  {!!data && <LastRefresh value={data.blocks.LastRefresh} />}
                </Col>
                <Col>
                  <Button
                    shape="circle"
                    icon="reload"
                    onClick={() => refetch({ refresh: true })}
                    loading={loading || networkStatus === 4}
                  />
                </Col>
              </Row>
              <Table
                columns={columns}
                dataSource={blocks}
                pagination={false}
                size="small"
                loading={loading || networkStatus === 4}
                onChange={onChangeTable.bind(this)}
              />
              {!!data && (
                <Pagination
                  className="pagination-center"
                  current={paginate.Page}
                  total={paginate.Total}
                  showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
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
