import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { TransactionTypeStatsPage } from '../../pages'
import { getTransactionTypeStats, getBlockTransactionSummaryStats } from '../../store/actions'

class TransactionTypeStats extends Component {
  _isMounted = false

  componentDidMount() {
    this.handleRefreshTransactionType()
    this.handleRefreshBlockSummary()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  async handleRefreshTransactionType() {
    this._isMounted = true
    this.props.getTransactionTypeStats()
  }

  async handleRefreshBlockSummary() {
    this._isMounted = true
    this.props.getBlockTransactionSummaryStats()
  }

  render() {
    return (
      <TransactionTypeStatsPage
        transactionType={this.props.transactionTypeStats}
        blockSummary={this.props.blockTransactionSummaryStats}
        onRefreshTransactionType={this.handleRefreshTransactionType.bind(this)}
        onRefreshBlockSummary={this.handleRefreshBlockSummary.bind(this)}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    transactionTypeStats: state.transactionTypeStats,
    blockTransactionSummaryStats: state.blockTransactionSummaryStats,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getTransactionTypeStats, getBlockTransactionSummaryStats }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionTypeStats)
