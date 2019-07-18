import React from 'react'
import PropTypes from 'prop-types'
import Navigation from '../Navigation'
import SearchBanner from '../SearchBanner'

function DefaultLayout({ children }) {
  return (
    <>
      <Navigation />
      <SearchBanner />
      {children}
    </>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

DefaultLayout.defaultProps = {
  children: null,
}

export default DefaultLayout
