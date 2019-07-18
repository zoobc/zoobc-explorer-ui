import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { BlockTransactionPeriodStatsPage } from '../../pages'
import { getBlockTransactionPeriodStats, setBlockTransactionPeriodStats } from '../../store/actions'

class BlockTransactionPeriodStats extends Component {
  _isMounted = false

  componentDidMount() {
    this.handleRefresh()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  async handleChangeStartDate(val) {
    this.props.setBlockTransactionPeriodStats({ startDate: val })
  }

  async handleChangeEndDate(val) {
    this.props.setBlockTransactionPeriodStats({ endDate: val })
  }

  async handleRefresh() {
    this._isMounted = true
    this.props.getBlockTransactionPeriodStats()
  }

  async handleFilter(val) {
    this.props.getBlockTransactionPeriodStats(val.startDate, val.endDate)
  }

  render() {
    const {
      loading,
      error,
      message,
      startDate,
      endDate,
      data,
    } = this.props.blockTransactionPeriodStats

    return (
      <BlockTransactionPeriodStatsPage
        loading={loading}
        error={error}
        message={message}
        startDate={startDate}
        endDate={endDate}
        data={data}
        onFilter={val => this.handleFilter(val)}
        onRefresh={this.handleRefresh.bind(this)}
        onChangeEndDate={val => this.handleChangeEndDate(val)}
        onChangeStartDate={val => this.handleChangeStartDate(val)}
      />
    )
  }
}

const mapStateToProps = state => {
  return { blockTransactionPeriodStats: state.blockTransactionPeriodStats }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBlockTransactionPeriodStats, setBlockTransactionPeriodStats }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockTransactionPeriodStats)
