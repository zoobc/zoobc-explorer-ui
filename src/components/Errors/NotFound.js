import React from 'react'
import notFound from '../../assets/images/not-found.svg'
import Container from '../Container'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container>
      <div className="error-content">
        <img src={notFound} alt="not found" />
        <span className="error-title page-title">
          Sorry the page you are looking for is not found
        </span>
        <Link to="/">
          <Button type="primary">Back to Homepage</Button>
        </Link>
      </div>
    </Container>
  )
}

export default NotFound
