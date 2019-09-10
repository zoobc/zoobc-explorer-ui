import React from 'react'
import { Typography, Input } from 'antd'

const { Title } = Typography

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <Title className="hero-title">Zoo BC Explorer</Title>
        <Title level={4} className="hero-subtitle">A webview for searching and displaying data published, so that a user can easily find any info about blockchain</Title>
        <Input size="large" placeholder="Search for a transaction or block hash" />
      </div>
    </div>
  )
}

export default Hero
