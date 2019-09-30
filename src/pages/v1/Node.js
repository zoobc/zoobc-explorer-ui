import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Row, Col, Card, Typography } from 'antd'
import NumberFormat from 'react-number-format'

import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import DescItem from '../../components/DescItem'
import NotFound from '../../components/Errors/NotFound'
import LoaderPage from '../../components/Loader/LoaderPage'
import CopyToClipboard from '../../components/CopyToClipboard'

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

const Node = ({ match }) => {
  const { params, url } = match
  const urlLastCharacter = url[url.length - 1]
  let nodePublicKey = params.id

  if (urlLastCharacter === '/') {
    nodePublicKey = `${url.split('/')[2]}/`
  }

  const { loading, data, error } = useQuery(GET_NODE_DATA, {
    variables: {
      NodePublicKey: nodePublicKey,
    },
  })
  return (
    <DefaultLayout>
      {!!error && <NotFound />}
      {!!loading && <LoaderPage />}
      {!error && !loading && (
        <Container fluid>
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
            </Col>
          </Row>
        </Container>
      )}
    </DefaultLayout>
  )
}

export default Node
