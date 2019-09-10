import React from 'react'
import { Row, Col, Card, Typography, Button, Table } from 'antd';
import { Link } from 'react-router-dom'
// import { useQuery } from '@apollo/react-hooks'
// import gql from 'graphql-tag'

import DefaultLayout from '../../components/DefaultLayout';
import Container from '../../components/Container';

const { Title } = Typography

// const GET_HOME_DATE = gql`
//   query {
//     block {
//       Blocks {
//         ID
//         Height
//         BlocksmithAddress
//         Transactions {
//           ID
//         }
//       }
//     }
//     transactions {
//       ID
//       Blocksmith
//       Type
//     }
//   }
// `;

// const dataBlock = [
//   {
//     key: "1",
//     height: 1,
//     transactions: 23,
//     blocksmith: 'asdsadiqwndqnwdmmdnsandlasndkanslk'
//   },
//   {
//     key: "2",
//     height: 2,
//     transactions: 23,
//     blocksmith: 'asdsadiqwndqnwdmmdnsandlasndkanslk'
//   },
//   {
//     key: "3",
//     height: 3,
//     transactions: 23,
//     blocksmith: 'asdsadiqwndqnwdmmdnsandlasndkanslk'
//   },
//   {
//     key: "4",
//     height: 4,
//     transactions: 23,
//     blocksmith: 'asdsadiqwndqnwdmmdnsandlasndkanslk'
//   },
//   {
//     key: "5",
//     height: 5,
//     transactions: 23,
//     blocksmith: 'asdsadiqwndqnwdmmdnsandlasndkanslk'
//   },
// ];

const columns = [
  {
    title: 'Height',
    dataIndex: 'height',
    key: 'height',
    render(record) {
      return (
        <Link to="/">{record}</Link>
      )
    }
  },
  {
    title: 'Transactions',
    dataIndex: 'transactions',
    key: 'transactions',
  },
  {
    title: 'Blocksmith',
    dataIndex: 'blocksmith',
    key: 'blocksmith',
    render(record) {
      return (
        <Link to="/">{record}</Link>
      )
    }
  },
]

// const dataTrx = [
//   {
//     key: "1",
//     transactionsId: 23,
//     blocksmith: 'asdsadiqwndqnwdmmdnsandlasndkanslk',
//     type: 'Ordinary Payment',
//   },
//   {
//     key: "2",
//     transactionsId: 23,
//     blocksmith: 'asdsadiqwndqnwdmmdnsandlasndkanslk',
//     type: 'Ordinary Payment',
//   },
//   {
//     key: "3",
//     transactionsId: 23,
//     blocksmith: 'asdsadiqwndqnwdmmdnsandlasndkanslk',
//     type: 'Ordinary Payment',
//   },
//   {
//     key: "4",
//     transactionsId: 23,
//     blocksmith: 'asdsadiqwndqnwdmmdnsandlasndkanslk',
//     type: 'Ordinary Payment',
//   },
//   {
//     key: "5",
//     transactionsId: 23,
//     blocksmith: 'asdsadiqwndqnwdmmdnsandlasndkanslk',
//     type: 'Ordinary Payment',
//   },
// ];

const columnsTrx = [
  {
    title: 'Transactions Id',
    dataIndex: 'transactionsId',
    key: 'transactionsId',
    render(record) {
      return (
        <Link to="/">{record}</Link>
      )
    }
  },
  {
    title: 'Blocksmith',
    dataIndex: 'blocksmith',
    key: 'blocksmith',
    render(record) {
      return (
        <Link to="/">{record}</Link>
      )
    }
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
]

const Home = () => {
  // const { loading, error, data } = useQuery(GET_HOME_DATE);
  return (
    <DefaultLayout withHero>
      <Container fluid>
        <Row gutter={8}>
          <Col span={12}>
            <Card>
              <Row>
                <Col span={21}>
                  <Title level={4}>Blocks</Title>
                </Col>
                <Col span={3}>
                  <Button size="small" type="primary">View all</Button>
                </Col>
              </Row>
              {/* <Table columns={columns} dataSource={!!data && data.blocks} pagination={false} size="small" loading={loading} /> */}
              <Table columns={columns} dataSource={[]} pagination={false} size="small" />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Row>
                <Col span={21}>
                  <Title level={4}>Transactions</Title>
                </Col>
                <Col span={3}>
                  <Button size="small" type="primary">View all</Button>
                </Col>
              </Row>
              {/* <Table columns={columnsTrx} dataSource={!!data && data.transactions} pagination={false} size="small" loading={loading} /> */}
              <Table columns={columnsTrx} dataSource={[]} pagination={false} size="small" />
            </Card>
          </Col>
        </Row>
      </Container>
    </DefaultLayout >
  )
}

export default Home
