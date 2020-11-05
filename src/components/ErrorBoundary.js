import React from 'react'
import Container from './Container'
import { Button } from 'antd'
import { ReactComponent as Maintenance } from '../assets/images/maintenance.svg'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <div className="error-content">
            <Maintenance width={200} height={200} />
            <span className="error-title page-title">Oops something went wrong !!!</span>
            <Button type="primary" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
