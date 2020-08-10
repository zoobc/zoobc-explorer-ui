/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import Radium, { StyleRoot } from 'radium'
import { slideInDown, fadeIn, flipInY } from 'react-animations'
import { Col, Typography } from 'antd'
import { isWebpSupported } from 'react-image-webp/dist/utils'

const Banner = () => {
  const styles = {
    slideInDown: {
      animation: 'x 3s',
      animationName: Radium.keyframes(slideInDown, 'slideInDown'),
    },
    fadeIn: {
      animation: 'x 6s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn'),
    },
    flipInY: {
      animation: 'x 3s',
      animationName: Radium.keyframes(flipInY, 'flipInY'),
    },
  }

  return (
    <StyleRoot>
      <Col className="home-col-left" md={{ span: 12 }} sm={{ span: 24 }}>
        <h1 style={styles.slideInDown} className="banner-text">
          <strong>New to ZooBC ?</strong>
          <strong>
            <p> Download the wallet to get started.</p>
          </strong>
          <p className="banner-text">
            ZooBC wallet is a mobile application that is able to connect with the
          </p>
          <Typography className="banner-sub-text">
            ZooBC blockchain network, which allows you to do the following :
            <ul>
              <li>Send ZooBC coins to your friends</li>
              <li>See your balance and transaction history</li>
              <li>Support Multi Signature Transaction</li>
              <li>Support Escrow Transaction</li>
            </ul>
          </Typography>
          <p className="banner-sub-text"></p>
        </h1>

        <div className="banner-button" style={styles.fadeIn}>
          <a
            className="play-store"
            href="https://zoobc.app/zoobc-alpha.apk"
            target="_blank"
            rel="noopener norefferer"
            title="PlayStore"
          >
            {isWebpSupported() ? (
              <img src={require('../assets/images/googleplay.webp')} alt="googleplaystore" />
            ) : (
              <img src={require('../assets/images/googleplay.png')} alt="googleplaystore" />
            )}
          </a>
          <a
            href="https://testflight.apple.com/join/O1QFINJP"
            target="_blank"
            rel="noopener norefferer"
            title="AppStore"
          >
            {isWebpSupported() ? (
              <img src={require('../assets/images/appstore.webp')} alt="appstore" />
            ) : (
              <img src={require('../assets/images/appstore.png')} alt="appstore" />
            )}
          </a>
        </div>
      </Col>

      <Col
        md={{ span: 12 }}
        sm={{ span: 24 }}
        style={{ textAlign: 'end' }}
        className="home-col-right banner-wallet"
      >
        {isWebpSupported() ? (
          <img src={require('../assets/images/banner.webp')} alt="wallet" style={styles.flipInY} />
        ) : (
          <img src={require('../assets/images/banner.png')} alt="wallet" style={styles.flipInY} />
        )}
      </Col>
    </StyleRoot>
  )
}

export default Banner
