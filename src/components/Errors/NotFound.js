import React from 'react'
import notFound from '../../assets/images/not-found.svg'
import Container from '../Container'

const NotFound = () => {
  return (
    <Container>
      <div className="error-content">
        <img src={notFound} alt="not found" />
      </div>
    </Container>
  )
}

export default NotFound
