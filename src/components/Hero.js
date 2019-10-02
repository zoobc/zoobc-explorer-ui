import React from 'react'
import { Typography, Input, Row, Col, Card, Icon } from 'antd'

const { Title } = Typography
const { Search } = Input

const Hero = () => {
  return (
    <Card className="hero">
      <div className="hero-content">
        <Title>ZooBC Explorer</Title>
        <Row gutter={24} style={{ width: '100%' }}>
          <Col span={24}>
            <Search
              size="large"
              prefix={<Icon type="search" style={{ fontSize: '22px', color: 'rgba(0,0,0,.45)' }} />}
              placeholder="Search by Address / Transaction ID / Block Height"
              enterButton="SEARCH"
            />
          </Col>
        </Row>
        <h6 className="hero-subtitle">
          A webview for searching and displaying data published, so that a user can easily find any
          info about blockchain
        </h6>
      </div>
    </Card>
  )
}

export default Hero
