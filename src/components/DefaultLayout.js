import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import Hero from './Hero'
import Header from '../components/Header'
import Footer from '../components/Footer'

const DefaultLayout = ({ children, withHero, fluid }) => {
  return (
    <>
      <Header fluid={fluid} />
      <Layout className="home-content">
        <Hero />
        {/* <Layout className="default-layout">{children}</Layout> */}
      </Layout>
      <Footer fluid={fluid} />
      {/* {withHero && <Hero />}
      <Footer fluid={fluid} /> */}
    </>
  )
}

DefaultLayout.propTypes = {
  withHero: PropTypes.bool,
}

DefaultLayout.defaultProps = {
  withHero: false,
}

export default DefaultLayout
