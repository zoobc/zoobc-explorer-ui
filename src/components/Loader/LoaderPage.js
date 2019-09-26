import React from 'react'
import Container from '../Container'
import { Spin } from 'antd'

const LoaderPage = () => {
  return (
    <Container>
      <div className="loader-content">
        <Spin size="large" />
      </div>
    </Container>
  )
}

export default LoaderPage
