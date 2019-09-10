import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import Hero from './Hero'

const DefaultLayout = ({ children, withHero }) => {
  return (
    <>
      {withHero && <Hero />}
      <Layout className="default-layout">
        {children}
      </Layout>
    </>
  )
}

DefaultLayout.propTypes = {
  withHero: PropTypes.bool,
}

DefaultLayout.defaultProps = {
  withHero: false
}

export default DefaultLayout
