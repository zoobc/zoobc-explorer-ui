import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import { withRouter } from 'react-router-dom'

import Hero from './Hero'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { hinge } from 'react-animations'
import Radium, { StyleRoot } from 'radium'
import AnimationContext from '../context/AnimationContext'

const DefaultLayout = ({ history, children, withHero, fluid }) => {
  // const { fvck69 } = history.location
  const { animation } = useContext(AnimationContext)

  const styles = {
    hingeHeader: {
      animation: 'x 3s',
      animationName: Radium.keyframes(hinge, 'hinge'),
    },
    hingeHero: {
      animation: 'x 4s',
      animationName: Radium.keyframes(hinge, 'hinge'),
    },
    hingeLayout: {
      animation: 'x 5s',
      animationName: Radium.keyframes(hinge, 'hinge'),
    },
    hingeFooter: {
      animation: 'x 6s',
      animationName: Radium.keyframes(hinge, 'hinge'),
    },
  }

  return (
    <StyleRoot>
      <div style={animation ? styles.hingeHeader : null}>
        <Header fluid={fluid} />
      </div>

      {withHero && (
        <div style={animation ? styles.hingeHero : null}>
          <Hero className="home-content" />
        </div>
      )}

      <Layout className="default-layout">
        <div style={animation ? styles.hingeLayout : null}>{children}</div>
      </Layout>

      <div style={animation ? styles.hingeFooter : null}>
        <Footer fluid={fluid} />
      </div>
    </StyleRoot>
  )
}

DefaultLayout.propTypes = {
  withHero: PropTypes.bool,
}

DefaultLayout.defaultProps = {
  withHero: false,
}

export default withRouter(DefaultLayout)
