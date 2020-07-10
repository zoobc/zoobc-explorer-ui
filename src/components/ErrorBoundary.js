import React from 'react'
import Container from './Container'
import { Button } from 'antd'

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
          <div className="error-content error-content-page flex-1">
            <div className="error-boundary">
              <p className="h2 mb-3">Oops something went wrong !!!</p>
              <Button type="primary" onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </div>
          </div>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
