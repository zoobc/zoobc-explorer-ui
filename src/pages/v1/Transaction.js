import React from 'react'
import { Row, Col, Card, Typography } from 'antd'
import DefaultLayout from '../../components/DefaultLayout'
import Container from '../../components/Container'
import DescItem from '../../components/DescItem'
import CopyToClipboard from '../../components/CopyToClipboard'

const { Title } = Typography

const Transaction = () => {
  return (
    <DefaultLayout>
      <Container fluid>
        <Row gutter={8}>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <Title level={4}>Transaction #123456</Title>
              </Col>
            </Row>
            <Card className="card-summary">
              <Title level={4}>Summary</Title>
              <DescItem label="Timestamp" value="16-Jul-2019 03:31:19" />
              <DescItem label="Transaction type" value="Send Money" />
              <DescItem
                label="Sender"
                value={
                  <CopyToClipboard text="00000000000000000015933029dca9ac633e2b2324bd88f2eee77ab7269fbf02" />
                }
              />
              <DescItem
                label="Recipient"
                value={
                  <CopyToClipboard text="00000000000000000015933029dca9ac633e2b2324bd88f2eee77ab7269fbf02" />
                }
              />
              <DescItem label="Confirmation" value="2464923742379" />
              <DescItem label="Fee" value="20" />
            </Card>
            <Card className="card-summary">
              <Title level={4}>Transaction Type</Title>
              <DescItem
                label="Node address"
                value={
                  <CopyToClipboard text="0000000000000000001dsad5933029dca9ac633e2b2324bd88f2eee77ab7269fbf02" />
                }
              />
              <DescItem label="Locked Funds" value="20" />
            </Card>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  )
}

export default Transaction
