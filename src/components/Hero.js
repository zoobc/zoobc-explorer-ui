import React from 'react'
import { Input, Row, Col, Card, Icon } from 'antd'

const { Search } = Input

const Hero = () => {
  return (
    <Card className="hero">
      <div className="hero-content">
        <h3>
          <strong>ZooBC Explorer</strong>
        </h3>
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
