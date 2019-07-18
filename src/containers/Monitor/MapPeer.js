import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { MapPeerPage } from '../../pages'
import { getMapPeers } from '../../store/actions'

class MapPeer extends Component {
  _isMounted = false

  componentDidMount() {
    this.handleRefresh()
  }

  async handleRefresh() {
    this._isMounted = true
    this.props.getMapPeers()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const { loading, error, message, data } = this.props.mapPeers

    return (
      <MapPeerPage
        loading={loading}
        error={error}
        message={message}
        data={data}
        onRefresh={this.handleRefresh.bind(this)}
      />
    )
  }
}

const mapStateToProps = state => {
  return { mapPeers: state.mapPeers }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getMapPeers }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPeer)
