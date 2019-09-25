import React from 'react'
import { Row, Col, Card, Typography, Table, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'

const { Title } = Typography

const columns = [
  {
    title: 'IP Address',
    dataIndex: 'address',
    key: 'address',
    render(record) {
      return <Link to="/">{record}</Link>
    },
  },
  {
    title: 'Registry Status',
    dataIndex: 'lastActive',
    key: 'lastActive',
  },
  {
    title: 'PoP Score',
    dataIndex: 'fees',
    key: 'fees',
  },
  {
    title: 'Owner',
    dataIndex: 'known',
    key: 'known',
  },
]

const Nodes = () => {
  return (
    <DefaultLayout>
      <Container fluid>
        <Row gutter={8}>
          <Col span={24}>
            <Card>
              <Row>
                <Col span={24}>
                  <Title level={4}>
                    <i className="bcz-user" />Accounts
                  </Title>
                </Col>
              </Row>
              <Table columns={columns} dataSource={[]} pagination={false} size="small" />
              <Pagination className="pagination-center" current={5} total={100} />
            </Card>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  )
}

export default Nodes
