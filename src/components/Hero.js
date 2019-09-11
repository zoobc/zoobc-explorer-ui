import React from 'react'
import { Typography, Input, Select, Row, Col } from 'antd'

const { Title } = Typography

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <Title className="hero-title">Zoo BC Explorer</Title>
        <Title level={4} className="hero-subtitle">
          A webview for searching and displaying data published, so that a user can easily find any
          info about blockchain
        </Title>
        <Row gutter={8} style={{ width: '100%' }}>
          <Col span={18}>
            <Input size="large" placeholder="Search for a transaction or block hash" />
          </Col>
          <Col span={6}>
            <Select size="large" value="sad" style={{ width: '100%' }}>
              <Select.Option value="sad">Blocks</Select.Option>
              <Select.Option value="sada">Transactions</Select.Option>
            </Select>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Hero
