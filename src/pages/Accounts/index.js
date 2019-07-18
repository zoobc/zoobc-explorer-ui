import React, { Component } from 'react'
import { Row, Container } from 'reactstrap'
import queryString from 'query-string'
import { withTranslation } from 'react-i18next'
import AccountSummary from './AccountSummary'
import NotFound from '../Errors/NotFound'
import LatestTransactions from './LatestTransactions'

class Accounts extends Component {
  render() {
    const acc = queryString.parse(this.props.location.search)

    return acc.pk ? (
      <Container id="account-details" className="px-2 mb-4 mt-5">
        <Row>
          <AccountSummary id={acc.pk} />
          <LatestTransactions />
        </Row>
      </Container>
    ) : (
      <NotFound />
    )
  }
}

export default withTranslation()(Accounts)
