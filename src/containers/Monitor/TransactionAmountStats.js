import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { TransactionAmountStatsPage } from '../../pages'
import { getTransactionAmountStats } from '../../store/actions'

class TransactionAmountStats extends Component {
  _isMounted = false

  componentDidMount() {
    this.handleRefresh()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  async handleRefresh() {
    this._isMounted = true
    this.props.getTransactionAmountStats()
  }

  async handleFilter(val) {
    this.props.getTransactionAmountStats(val.blockID, null, val.senderPK, val.recipientPK)
  }

  render() {
    const {
      loading,
      error,
      message,
      data,
      blockID,
      senderPK,
      recipientPK,
      listBlockIds,
      listSenderPKs,
      listRecipientPKs,
    } = this.props.transactionAmountStats

    return (
      <TransactionAmountStatsPage
        loading={loading}
        error={error}
        message={message}
        data={data}
        blockID={blockID}
        senderPK={senderPK}
        recipientPK={recipientPK}
        listBlockIds={listBlockIds}
        listSenderPKs={listSenderPKs}
        listRecipientPKs={listRecipientPKs}
        onRefresh={this.handleRefresh.bind(this)}
        onFilter={val => this.handleFilter(val)}
      />
    )
  }
}

const mapStateToProps = state => {
  return { transactionAmountStats: state.transactionAmountStats }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getTransactionAmountStats }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionAmountStats)
