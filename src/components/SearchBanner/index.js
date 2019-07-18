import React from 'react'
import { Input, Container, Row, Col, Form, Alert } from 'reactstrap'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { BlockSearch, TransactionSearch } from '../../schemas'

const searchBlock = graphql(BlockSearch, {
  props: ({ data }) => ({
    loading: data.loading,
    error: data.error,
    blocks: data.block ? data.block.Blocks : [],
  }),
})

const searchTransaction = graphql(TransactionSearch, {
  props: ({ data }) => ({
    loading: data.loading,
    error: data.error,
    transactions: data.transactions || [],
  }),
})

class SearchBanner extends React.Component {
  constructor() {
    super()
    this.state = {
      searchType: 'block',
      searchQuery: '',
      error: false,
    }
    this.onDismiss = this.onDismiss.bind(this)
  }

  onDismiss() {
    this.setState({ error: false })
  }

  onSearchTypeChange(e) {
    const { searchQuery } = this.state
    this.setState({ searchType: e.target.value })
    this.search(searchQuery, e.target.value)
  }

  onSearchQueryChange(e) {
    this.setState({ searchQuery: e.target.value })
  }

  search(query, type) {
    const {
      history: { push },
      blocks,
      transactions,
    } = this.props

    if (!query) return

    if (type === 'block') {
      const findBlock = blocks.filter(item => item.ID === query)

      if (findBlock.length > 0) {
        push(`/blocks/${findBlock[0].ID}`)
        this.setState({ error: false })

        return
      }

      this.setState({ error: true })
    } else if (type === 'transaction') {
      const findTransaction = transactions.filter(item => item.ID === query)

      if (findTransaction.length > 0) {
        push(`/transactions/${findTransaction[0].ID}`)
        this.setState({ error: false })

        return
      }

      this.setState({ error: true })
    }
  }

  onSubmit(e) {
    e.preventDefault()

    const { searchQuery, searchType } = this.state
    this.search(searchQuery, searchType)
  }

  render() {
    const { searchType, searchQuery, error } = this.state
    const { t } = this.props
    return (
      <Container className="pt-5">
        <Form onSubmit={this.onSubmit.bind(this)}>
          <Row>
            <Col className="px-0 col-8" md={{ size: 8 }}>
              <Input
                value={searchQuery}
                onChange={this.onSearchQueryChange.bind(this)}
                onPaste={this.onSearchQueryChange.bind(this)}
                placeholder={t('Search for a transaction or a block hash')}
              />
              {error && (
                <Alert color="danger" isOpen={this.state.error} toggle={this.onDismiss}>
                  Cannot find <strong>{searchType}</strong> with search{' '}
                  <strong>{searchQuery}</strong>
                </Alert>
              )}
            </Col>
            <Col className="px-0 col-4" md={{ size: 4 }}>
              <Input type="select" value={searchType} onChange={this.onSearchTypeChange.bind(this)}>
                <option value="block">{t('Block')}</option>
                <option value="transaction">{t('Transaction')}</option>
              </Input>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}

export default compose(
  withRouter,
  searchBlock,
  searchTransaction,
  withTranslation()
)(SearchBanner)
