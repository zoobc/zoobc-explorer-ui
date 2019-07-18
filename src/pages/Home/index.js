import React, { Component } from 'react'
import { Row, Col, Container } from 'reactstrap'
import logo from '../../assets/images/banner-home.jpg'
import BlockUpdate from './../Blocks/BlockUpdate'
import TransactionUpdate from './../Transactions/TransactionUpdate'
import SearchBanner from '../../components/SearchBanner/index'
import { withTranslation } from 'react-i18next'

class Home extends Component {
  render() {
    const { t } = this.props
    return (
      <Container id="home">
        <Row>
          <Col className="px-0" md={{ size: 12 }}>
            <div className="banner-home">
              <img className="img-fluid" alt="logo" src={logo} />
              <div className="top-left-text">Spinechain Explorer</div>
              <div className="text-content">
                {t(
                  'Frontend application for visualizing and presenting the information and activity on the Spinechain Blockchain.'
                )}
              </div>
              <div className="search">
                <SearchBanner />
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-5 pb-5">
          <BlockUpdate />
          <TransactionUpdate />
        </Row>
      </Container>
    )
  }
}

export default withTranslation()(Home)
